const Product=[
    
    {
        id:1,
        name: "alt name",
        title: "title",
        price: 1,
        sizearray:[26, 27, 28, 29, 30, 32, 34, 36],
        colorofproducts: ["black","camel"],
        description: "<p>Lorem ipsum dolor sit amet</p>"+ "<p>price: $1</p>",
        img: [ { color: "black",
                 size: "null",
                 url: "Images/Fashion/Men/Prod1/black.jpg"
             },
             { color: "camel",
                size: "null",
                 url: "Images/Fashion/Men/Prod1/camel.jpg"
             }
             
            ]   
    },

    {
        id:2,
        name: "alt name",
        title: "title",
        price: 1,
        sizearray:[26, 27, 28, 29, 30, 32, 34, 36],
        colorofproducts: ["beige","darkgrey","gray","red"],
        description: "<p>Lorem ipsum dolor sit amet</p>"+ "<p>price: $1</p>",
        img: [ { color: "beige",
                 size: "null",
                 url: "Images/Fashion/Men/Prod2/beige.jpg"
             },
             { color: "darkgrey",
             size: "null",
                 url: "Images/Fashion/Men/Prod2/darkgrey.jpg"
             },
             { color: "gray",
             size: "null",
                 url: "Images/Fashion/Men/Prod2/gray.jpg"
             },
             { color: "red",
             size: "null",
                 url: "Images/Fashion/Men/Prod2/red.jpg"
             }
            ]   
    }

    
    
]


const Size= "Images/Size/size1.webp";
export default Product;
export {Size};