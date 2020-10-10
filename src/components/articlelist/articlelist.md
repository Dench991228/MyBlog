## props
- Type:用来描述这个文章列表放在哪
    - Sector:按照分区获取
    - UID:按照用户获取
- Value:用来配合Type
    - 如果Type是Sector则Value是pid，-1代表全部分区
    - 如果Type是UID则Value是uid