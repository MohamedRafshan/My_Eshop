import prismadb from "@/lib/prismadb";

const getProducts = async(storeId) => {

    const products = await prismadb.product.findMany({
        where:{
            storeId: storeId
        }
    })

    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
    }))


    return formattedProducts;
}

export default getProducts;