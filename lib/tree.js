function arrToTree(arr){
  const result = []
  const map = arr.reduce((prev,item)=>{
    item.children = []
    prev[item.id] = item
    return prev
  },{})
  arr.forEach(item => {
    if(map[item.parentId]){
      map[item.parentId].children.push(item)
    }else{
      result.push(item)
    }
  })
  return result
}
