import React from 'react'

const layout = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default layout;

export async function  generateMetadata() {
    return{
        title :"Your Meetings | Schedulla",
        description : "View and manage your upcoming and past meetings."
    }

}