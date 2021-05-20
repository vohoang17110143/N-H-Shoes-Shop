import React, { useState, useEffect } from "react";
import "./Comment.css";
import jwt_decode from "jwt-decode";
import TotalRating from "../Rating/TotalRating";
import ImageAvatar from "../../../../assets/image/avatar-default.png";
import ratingApi from "./../../../../api/ratingApi";
import { useLocation } from "react-router-dom";
import commentApi from "./../../../../api/commentApi";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";

const CommentBox = (props) => {
  const { AuthToken, productId } = props;
  const [showComments, setShowComments] = useState(true);
  const [text, setText] = useState("Hiện bình luận");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const loadComment = () => {
    commentApi
      .getComment(props.productId)
      .then((res) => {
        setComments(res);
      })
      .catch((err) => alert(err));
  };

  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/shopshoe")
    .withAutomaticReconnect()
    .build();

  useEffect(async () => {
    loadComment();
    await connection
      .start()
      .then((res) => {
        connection.on("Add_Comment", () => {
          loadComment();
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  const handleOnclickShow = (e) => {
    setShowComments(!showComments);
    if (text == "Hiện bình luận") setText("Ẩn bình luận");
    else setText("Hiện bình luận");
  };

  const [details, setDetails] = useState([]);
  const toggleComments = (index) => {
    console.log(index);
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  const handleReply = (parentid) => {
    console.log("productId" + productId);
    console.log("parentid" + parentid);
    commentApi
      .CreateComment({
        content,
        ProductId: productId,
        CustomerId: AuthToken.cusID,
        parentid: parentid,
      })
      .then((res) => {})
      .catch((err) => alert(err));
  };
  const totalComment = () => {
    var total = comments.length;
    console.log(comments);
    comments.forEach((comment) => {
      total += comment.commentChidrents.length;
    });
    return total;
  };
  return (
    <div className="comment-box">
      <button id="comment-reveal" onClick={handleOnclickShow}>
        {text}
      </button>
      <Header as="h3" dividing>
        {totalComment()} Comments
      </Header>
      {showComments == true ? (
        <div>
          <Comment.Group className="comments-ui">
            {comments.map((comment, index) => (
              <Comment key={comment.id}>
                <Comment.Avatar
                  style={{
                    width: "45px",
                    height: "45px",
                    marginRight: "10px",
                  }}
                  src={comment.avatar}
                />
                <Comment.Content>
                  <Comment.Author as="a">{comment.userName}</Comment.Author>
                  <Comment.Metadata>
                    <div> {comment.datePost.split(" ")[0]}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.content}</Comment.Text>
                  <Comment.Actions disable={AuthToken.isLoggedIn}>
                    <Comment.Action onClick={(e) => toggleComments(index)}>
                      Reply
                    </Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
                {/* {comment.commentChidrents.length > 0 ? ( */}
                <Comment.Group>
                  {comment.commentChidrents.map((commentChild) => (
                    <Comment
                      key={commentChild.id}
                      style={{ marginLeft: "20px" }}
                    >
                      <Comment.Avatar
                        style={{
                          width: "45px",
                          height: "45px",
                          marginRight: "10px",
                        }}
                        src={commentChild.avatar}
                      />
                      <Comment.Content>
                        <Comment.Author as="a">
                          {comment.userName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div> {commentChild.datePost.split(" ")[0]}</div>
                        </Comment.Metadata>
                        <Comment.Text>{commentChild.content}</Comment.Text>
                        <Comment.Actions>
                          {/* <Comment.Action>Reply</Comment.Action> */}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                  <Form
                    reply
                    hidden={!details.includes(index) || !AuthToken.isLoggedIn}
                    style={{ marginTop: "20px", marginLeft: "20px" }}
                  >
                    <Form.Input onChange={(e) => setContent(e.target.value)} />
                    <Button
                      content="Đăng bình luận"
                      labelPosition="left"
                      icon="send"
                      primary
                      onClick={(e) => handleReply(comment.id)}
                    />
                  </Form>
                </Comment.Group>
                {/* ) : null} */}
              </Comment>
            ))}
          </Comment.Group>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthToken: state.AuthToken,
  };
};
export default connect(mapStateToProps)(CommentBox);
