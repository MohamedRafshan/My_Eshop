import prismadb from "@/lib/prismadb";

import ProductBoardForm from "./components/product-form";


const ProductBoard= async({params}) => {
    
    
    const product = await prismadb.Product.findUnique({
        where:{
            id: params.productId
        },
        include:{
            category:true,
        }
    })

    const categories = await prismadb.Category.findMany({
        where:{
            storeId: params.storeId
        }
    });


    

    return ( 
        <div className="flex-col">
            <div className="flex-col space-y-4 p-6">
                <ProductBoardForm 
                    categories={categories}
                    initialData={product}
                />
            </div>
            
        </div>
     );
}
 
export default ProductBoard;