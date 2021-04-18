import React from 'react'
import * as containerStyles from "./container.module.css"

export default function Container({children}){
    return <div className={containerStyles.pageContainer}><main className={containerStyles.container}>{children}</main><footer className={containerStyles.footer}><a href="/" >Back to the portfolio</a></footer></div>
}