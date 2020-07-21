import React from "react"

import { Grid } from "@material-ui/core"

import ProductStockSize from "./product-stock-size"

const ProductStock = ({ styleCode = "", sizeRange = [], category = "", ...props }) => {
    return (
        <Grid container spacing={.5} {...props}>
            {
                sizeRange.map(size => (
                    <Grid item xs={12} key={size.code}>
                        <ProductStockSize
                            styleCode={styleCode}
                            size={size}
                            category={category}
                            autoCheck={sizeRange.length === 1}
                            useIcon={sizeRange.length === 1}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ProductStock
