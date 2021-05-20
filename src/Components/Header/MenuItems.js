// import MaleShoe from "../../icons/Shoes.png";
import MaleShoe from '../../assets/icons/Shoes.png'
import Onsale1 from '../../assets/icons/sale.png'
import Onsale2 from '../../assets/icons/onsale.png'
import Balo from '../../assets/icons/balo.png'
import HighHeel from '../../assets/icons/Heel.png'
export const MenuItems= [
    {
        title:'GIÀY NỮ',
        url:'/collections',
        img: HighHeel,
        alt: 'Women shoes',
        cName:'list-inline-item',
        sex:'Nữ',
        
    },
    {
        title:'GIÀY NAM',
        url:'/collections',
        img:MaleShoe,
        alt: 'Male shoes',
        cName:'list-inline-item',
        sex:'Nam'
    },
    {
        title:'SALE 79K',
        url:'/collections',
        img:Onsale1,
        alt: 'Onsale-79',
        cName:'list-inline-item'
    },
    {
        title:'SALE 100K',
        url:'/collections',
        img:Onsale2,
        alt: 'Onsale-100',
        cName:'list-inline-item'
    },
    {
        title:'BALO-TÚI',
        url:'/collections',
        img:Balo,
        alt: 'Bag',
        cName:'list-inline-item'
    }
];