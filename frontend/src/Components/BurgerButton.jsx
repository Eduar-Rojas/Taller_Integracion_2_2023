import React from "react"
import styled from "styled-components"
function BurgerButton() {
    return (
        <Burger>
           <input type="checkbox" role="button" aria-label="Display the menu" class="menu"></input>
        </Burger>
    )
}

export default BurgerButton

const Burger = styled.div`
.menu {
    --s: 30px; /* control the size */
    --c: white; /* the color */
    
    height: var(--s);
    aspect-ratio: 1;
    border: none;
    padding: 0;
    border-inline: calc(var(--s)/2) solid #0000; 
    box-sizing: content-box;
    --_g1: linear-gradient(var(--c) 20%,#0000 0 80%,var(--c) 0) 
           no-repeat content-box border-box;
    --_g2: radial-gradient(circle closest-side at 50% 12.5%,var(--c) 95%,#0000) 
           repeat-y content-box border-box;
    background: 
      var(--_g2) left  var(--_p,0px) top,
      var(--_g1) left  calc(var(--s)/10 + var(--_p,0px)) top,
      var(--_g2) right var(--_p,0px) top,
      var(--_g1) right calc(var(--s)/10 + var(--_p,0px)) top;
    background-size: 
      20% 80%,
      40% 100%;
    position: relative;
    clip-path: inset(0 25%);
    -webkit-mask: linear-gradient(90deg,#0000,#000 25% 75%,#0000);
    cursor: pointer;
    transition: 
      background-position .3s var(--_s,.3s), 
      clip-path 0s var(--_s,.6s);
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
  }
  .menu:before,
  .menu:after {
    content:"";
    position: absolute;
    border-radius: var(--s);
    inset: 40% 0;
    background: var(--c);
    transition: transform .3s calc(.3s - var(--_s,.3s));
  }
  
  .menu:checked {
    clip-path: inset(0);
    --_p: calc(-1*var(--s));
    --_s: 0s;
  }
  .menu:checked:before {
    transform: rotate(45deg);
  }
  .menu:checked:after {
    transform: rotate(-45deg);
  }
  .menu:focus-visible {
    clip-path: none;
    -webkit-mask: none;
    border: none;
    outline: 2px solid var(--c);
    outline-offset: 5px;
  }
  
  body {
    margin:0;
    min-height:100vh;
    display:grid;
    place-content:center;
  }
`