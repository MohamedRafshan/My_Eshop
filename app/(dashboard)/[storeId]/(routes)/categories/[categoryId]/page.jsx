import prismadb from "@/lib/prismadb";

import CategoryForm from "./component/category-form";


const Category= async({params}) => {
    
    
    const category = await prismadb.Category.findUnique({
        where:{
            id: params.categoryId
        }
    })

    console.log("category insdie the category", category)

    return ( 
        <div className="flex-col">
            <div className="flex-col space-y-4 p-6">
                <CategoryForm 
                    initialData={category}
                />
            </div>
            
        </div>
     );
}
 
export default Category;