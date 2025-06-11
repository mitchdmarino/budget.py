export default function Category ({category}) {
    let color;
    let name = category.name;
    if (category && category.color) {
        color = category.color; 
    }
    if (!color) {
        color = "#FFFFFF"
    }
    return (
        <svg width="25px" height="25px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003" transform="rotate(45)matrix(-1, 0, 0, -1, 0, 0)">
            <title>{name}</title>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#030303" stroke-width="2.7359999999999998"> 
                <path d="M15.3158 5C15.9505 5 16.5189 5.31263 16.86 5.79579L21 11.6316L16.86 17.4674C16.5189 17.9505 15.9505 18.2632 15.3158 18.2632L4.89474 18.2537C3.85263 18.2537 3 17.4105 3 16.3684V6.89474C3 5.85263 3.85263 5.00947 4.89474 5.00947L15.3158 5Z" fill={color}></path> 
            </g>    
            <g id="SVGRepo_iconCarrier"> 
                <path d="M15.3158 5C15.9505 5 16.5189 5.31263 16.86 5.79579L21 11.6316L16.86 17.4674C16.5189 17.9505 15.9505 18.2632 15.3158 18.2632L4.89474 18.2537C3.85263 18.2537 3 17.4105 3 16.3684V6.89474C3 5.85263 3.85263 5.00947 4.89474 5.00947L15.3158 5Z" fill={color}></path> 
            </g>
        </svg>
    )
}