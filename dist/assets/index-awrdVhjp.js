import{i as x,a as N,d as $,s as L,e as f,f as T,h as v,r as g,j as _,k as S,l as B,m as F,n as D}from"./wagmi-xk77RrlY.js";import{h as A}from"./viem-BbTj4bTf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const O=()=>{const e=localStorage.getItem("walletconnect_project_id");return e||null},k=O(),U=k?[x(),N({projectId:k})]:[x()],i=$({chains:[L],connectors:U,transports:{[L.id]:A()}}),R=e=>{localStorage.setItem("walletconnect_project_id",e),window.location.reload()},W=()=>localStorage.getItem("walletconnect_project_id")||"";function P(e,t="info",n=3e3){const r=document.querySelector(".toast");r&&r.remove();const s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.remove()},n)}function u(e){P(e,"error",4e3)}function y(e){P(e,"success",3e3)}function E(e){P(e,"info",3e3)}var z=Object.defineProperty,q=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,M=(e,t,n)=>q(e,typeof t!="symbol"?t+"":t,n);class Y{constructor(){M(this,"element",null),M(this,"overlay",null)}show(t="Loading..."){this.hide(),this.overlay=document.createElement("div"),this.overlay.className="modal-overlay",this.element=document.createElement("div"),this.element.className="modal-content flex flex-col items-center gap-4",this.element.innerHTML=`
      <div class="spinner"></div>
      <p class="text-white text-lg">${t}</p>
    `,this.overlay.appendChild(this.element),document.body.appendChild(this.overlay)}hide(){this.overlay&&(this.overlay.remove(),this.overlay=null,this.element=null)}update(t){if(this.element){const n=this.element.querySelector("p");n&&(n.textContent=t)}}}const a=new Y,V=[{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"properties",outputs:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"address",name:"owner",type:"address"},{internalType:"string",name:"propertyHash",type:"string"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"bool",name:"isListed",type:"bool"},{internalType:"uint256",name:"listedAt",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"transactions",outputs:[{internalType:"uint256",name:"propertyId",type:"uint256"},{internalType:"address",name:"seller",type:"address"},{internalType:"address",name:"buyer",type:"address"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"timestamp",type:"uint256"},{internalType:"bool",name:"completed",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"userProperties",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"userTransactions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_propertyHash",type:"string"},{internalType:"uint256",name:"_price",type:"uint256"}],name:"registerProperty",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"listProperty",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"delistProperty",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"},{internalType:"uint256",name:"_newPrice",type:"uint256"}],name:"updatePrice",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"purchaseProperty",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address",name:"_owner",type:"address"}],name:"getPropertiesByOwner",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getTransactionsByUser",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getListedProperties",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getTotalProperties",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getTotalTransactions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"getProperty",outputs:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"address",name:"owner",type:"address"},{internalType:"string",name:"propertyHash",type:"string"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"bool",name:"isListed",type:"bool"},{internalType:"uint256",name:"listedAt",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_transactionId",type:"uint256"}],name:"getTransaction",outputs:[{internalType:"uint256",name:"propertyId",type:"uint256"},{internalType:"address",name:"seller",type:"address"},{internalType:"address",name:"buyer",type:"address"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"timestamp",type:"uint256"},{internalType:"bool",name:"completed",type:"bool"}],stateMutability:"view",type:"function"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"}],name:"PropertyRegistered",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"}],name:"PropertyListed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"}],name:"PropertyDelisted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!0,internalType:"address",name:"buyer",type:"address"},{indexed:!0,internalType:"address",name:"seller",type:"address"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"}],name:"PropertyPurchased",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"oldPrice",type:"uint256"},{indexed:!1,internalType:"uint256",name:"newPrice",type:"uint256"}],name:"PriceUpdated",type:"event"}],d="0xD90c73b42952565F334E5FB6C349B0005ac06669",p=V;async function C(e){const t=await g(i,{address:d,abi:p,functionName:"getProperty",args:[BigInt(e)]}),[n,r,s,o,c,H]=t;return{id:n,owner:r,propertyHash:s,price:o,isListed:c,listedAt:H}}async function G(){return await g(i,{address:d,abi:p,functionName:"getListedProperties"})}async function K(e){return await g(i,{address:d,abi:p,functionName:"getPropertiesByOwner",args:[e]})}async function Q(){return await g(i,{address:d,abi:p,functionName:"getTotalProperties"})}async function X(e,t){try{const n=await f(i,{address:d,abi:p,functionName:"registerProperty",args:[e,T(t)],gas:BigInt(5e5)});return await v(i,{hash:n})}catch(n){const r=n?.message||"";throw r.includes("Property hash cannot be empty")?new Error("Property hash is required."):r.includes("Price must be greater than 0")?new Error("Price must be greater than 0 ETH."):r.includes("User rejected")?new Error("Transaction was cancelled."):r.includes("insufficient funds")?new Error("Insufficient funds for gas fees."):new Error("Failed to register property. Please try again.")}}async function J(e){try{const t=await f(i,{address:d,abi:p,functionName:"listProperty",args:[BigInt(e)],gas:BigInt(3e5)});return await v(i,{hash:t})}catch(t){const n=t?.message||"";throw n.includes("Not property owner")?new Error("You are not the owner of this property."):n.includes("Property already listed")?new Error("This property is already listed for sale."):n.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Failed to list property. Please try again.")}}async function Z(e){try{const t=await f(i,{address:d,abi:p,functionName:"delistProperty",args:[BigInt(e)],gas:BigInt(3e5)});return await v(i,{hash:t})}catch(t){const n=t?.message||"";throw n.includes("Not property owner")?new Error("You are not the owner of this property."):n.includes("Property not listed")?new Error("This property is not currently listed."):n.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Failed to delist property. Please try again.")}}async function ee(e,t){try{const n=await f(i,{address:d,abi:p,functionName:"updatePrice",args:[BigInt(e),T(t)],gas:BigInt(3e5)});return await v(i,{hash:n})}catch(n){const r=n?.message||"";throw r.includes("Not property owner")?new Error("You are not the owner of this property."):r.includes("Price must be greater than 0")?new Error("Price must be greater than 0 ETH."):r.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Failed to update price. Please try again.")}}async function te(e,t){try{const n=await f(i,{address:d,abi:p,functionName:"purchaseProperty",args:[BigInt(e)],value:T(t),gas:BigInt(5e5)});return await v(i,{hash:n})}catch(n){const r=n?.message||"";throw r.includes("Cannot buy your own property")?new Error("You cannot purchase your own property. Please use a different wallet address."):r.includes("Property not listed")?new Error("This property is not listed for sale."):r.includes("Insufficient payment")?new Error("Payment amount is insufficient. Please check the property price."):r.includes("Property does not exist")?new Error("Property not found. It may have been removed."):r.includes("insufficient funds")?new Error("Insufficient funds in your wallet. Please add more ETH."):r.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Transaction failed. Please try again or contact support.")}}function I(e){return _(e)}let l;function ne(){const e=document.querySelector("#app");e.innerHTML=re(),se(),ie(),E("Welcome to Private Property Trading Platform")}function re(){return`
    <div class="min-h-screen">
      <header class="header">
        <div class="container mx-auto py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-info flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gradient">Private Property Trading</h1>
                <p class="text-xs" style="color: var(--color-text-secondary)">Secure Blockchain Marketplace</p>
              </div>
            </div>

            <div id="wallet-section" class="flex items-center gap-3">
              <button id="settings-btn" class="btn-secondary p-2" title="Settings">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>

              <button id="connect-btn" class="btn-primary flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>Connect Wallet</span>
              </button>

              <div id="account-info" class="hidden">
                <div class="flex items-center gap-3 card py-2 px-4">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-success flex items-center justify-center text-xs font-bold">
                    <span id="account-initial">?</span>
                  </div>
                  <span id="account-address" class="address-text text-sm"></span>
                  <button id="disconnect-btn" class="btn-secondary py-2 px-4 text-sm">Disconnect</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="container mx-auto py-8">
        <div class="flex gap-2 mb-8 border-b" style="border-color: var(--color-border)">
          <button id="tab-marketplace" class="tab-button tab-button-active flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>Marketplace</span>
          </button>

          <button id="tab-my-properties" class="tab-button tab-button-inactive flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>My Properties</span>
          </button>

          <button id="tab-history" class="tab-button tab-button-inactive flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>History</span>
          </button>
        </div>

        <div id="marketplace-content" class="tab-content">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold mb-1">Property Marketplace</h2>
              <p class="text-sm" style="color: var(--color-text-secondary)">Browse and purchase listed properties</p>
            </div>
            <button id="register-property-btn" class="btn-primary flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Register Property</span>
            </button>
          </div>

          <div id="listed-properties" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <p class="text-center col-span-full" style="color: var(--color-text-secondary)">Connect wallet to view properties</p>
          </div>
        </div>

        <div id="my-properties-content" class="tab-content hidden">
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-1">My Properties</h2>
            <p class="text-sm" style="color: var(--color-text-secondary)">Manage your property portfolio</p>
          </div>

          <div id="my-properties-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <p class="text-center col-span-full" style="color: var(--color-text-secondary)">No properties yet</p>
          </div>
        </div>

        <div id="history-content" class="tab-content hidden">
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-1">Transaction History</h2>
            <p class="text-sm" style="color: var(--color-text-secondary)">Complete audit trail of your transactions</p>
          </div>

          <div id="transaction-history" class="space-y-4">
            <p class="text-center" style="color: var(--color-text-secondary)">No transactions yet</p>
          </div>
        </div>
      </main>
    </div>
  `}function se(){document.getElementById("connect-btn")?.addEventListener("click",oe),document.getElementById("disconnect-btn")?.addEventListener("click",ae),document.getElementById("register-property-btn")?.addEventListener("click",ce),document.getElementById("settings-btn")?.addEventListener("click",ye),document.getElementById("tab-marketplace")?.addEventListener("click",()=>w("marketplace")),document.getElementById("tab-my-properties")?.addEventListener("click",()=>w("my-properties")),document.getElementById("tab-history")?.addEventListener("click",()=>w("history")),S(i,{onChange(e){l=e.address,b()}})}async function oe(){try{a.show("Connecting to wallet..."),await F(i,{connector:x()}),l=B(i).address,b(),y("Wallet connected successfully!"),a.hide()}catch(e){a.hide(),u(e.message||"Failed to connect wallet")}}async function ae(){try{await D(i),l=void 0,b(),E("Wallet disconnected")}catch(e){u(e.message||"Failed to disconnect")}}function ie(){const e=B(i);e.isConnected&&(l=e.address,b())}function b(){const e=document.getElementById("connect-btn"),t=document.getElementById("account-info"),n=document.getElementById("account-address"),r=document.getElementById("account-initial");if(l){if(e?.classList.add("hidden"),t?.classList.remove("hidden"),n){const s=`${l.slice(0,6)}...${l.slice(-4)}`;n.textContent=s}r&&(r.textContent=l.slice(2,3).toUpperCase()),m(),h()}else e?.classList.remove("hidden"),t?.classList.add("hidden")}async function m(){const e=document.getElementById("listed-properties");if(e)try{a.show("Loading properties...");const t=await Q();if(console.log("Total properties:",t),t===BigInt(0)){e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-text-secondary)">No properties registered yet. Register your first property!</p>',a.hide();return}const n=await G();if(n.length===0){e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-text-secondary)">No properties listed for sale yet</p>',a.hide();return}const r=[];for(const s of n)try{const o=await C(Number(s));r.push(o)}catch(o){console.error(`Failed to load property ${s}:`,o)}e.innerHTML=r.map(s=>j(s,!1)).join(""),r.forEach(s=>{document.getElementById(`purchase-${s.id}`)?.addEventListener("click",()=>ue(s))}),a.hide()}catch(t){a.hide(),console.error("Error loading properties:",t);const n=t?.message||"Unknown error";n.includes("reverted")||n.includes("execution")?e.innerHTML=`
        <div class="col-span-full card p-6 text-center">
          <p class="text-warning mb-2">⚠️ Contract Connection Issue</p>
          <p class="text-sm mb-4" style="color: var(--color-text-secondary)">
            Unable to read from the contract. This might be because:
          </p>
          <ul class="text-left text-sm max-w-md mx-auto" style="color: var(--color-text-secondary)">
            <li>• The contract ABI doesn't match the deployed contract</li>
            <li>• The contract address is incorrect</li>
            <li>• You're connected to the wrong network (should be Sepolia)</li>
          </ul>
          <p class="text-xs mt-4" style="color: var(--color-text-secondary)">
            Contract: <code class="font-mono">${d}</code>
          </p>
        </div>
      `:e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-error)">Failed to load properties</p>'}}async function h(){const e=document.getElementById("my-properties-list");if(!(!e||!l))try{const t=await K(l);if(t.length===0){e.innerHTML=`<p class="text-center col-span-full" style="color: var(--color-text-secondary)">You don't own any properties yet</p>`;return}const n=[];for(const r of t)try{const s=await C(Number(r));n.push(s)}catch(s){console.error(`Failed to load property ${r}:`,s)}e.innerHTML=n.map(r=>j(r,!0)).join(""),n.forEach(r=>{const s=document.getElementById(`list-${r.id}`),o=document.getElementById(`delist-${r.id}`),c=document.getElementById(`update-price-${r.id}`);s?.addEventListener("click",()=>le(r.id)),o?.addEventListener("click",()=>de(r.id)),c?.addEventListener("click",()=>pe(r))})}catch(t){console.error("Error loading my properties:",t),e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-error)">Failed to load your properties</p>'}}function j(e,t){const n=I(e.price),r=`${e.propertyHash.slice(0,10)}...${e.propertyHash.slice(-8)}`,s=`${e.owner.slice(0,6)}...${e.owner.slice(-4)}`,o=e.isListed?'<span class="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-success to-accent text-white">Listed</span>':'<span class="px-2 py-1 text-xs rounded-full" style="background: var(--color-panel); color: var(--color-text-secondary)">Unlisted</span>';let c="";return t?e.isListed?c=`
        <button id="delist-${e.id}" class="btn-secondary flex-1">Delist</button>
        <button id="update-price-${e.id}" class="btn-primary flex-1">Update Price</button>
      `:c=`
        <button id="list-${e.id}" class="btn-primary flex-1">List for Sale</button>
      `:e.isListed&&(c=`
      <button id="purchase-${e.id}" class="btn-primary w-full">Purchase for ${n} ETH</button>
    `),`
    <div class="card p-6 hover-lift">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Property #${e.id}</h3>
        ${o}
      </div>

      <div class="space-y-3 mb-5">
        <div>
          <p class="text-xs mb-1" style="color: var(--color-text-secondary)">Property Hash</p>
          <p class="text-sm font-mono">${r}</p>
        </div>

        <div>
          <p class="text-xs mb-1" style="color: var(--color-text-secondary)">Owner</p>
          <p class="text-sm font-mono">${s}</p>
        </div>

        <div>
          <p class="text-xs mb-1" style="color: var(--color-text-secondary)">Price</p>
          <p class="text-2xl font-bold text-gradient">${n} ETH</p>
        </div>
      </div>

      ${c?`<div class="flex gap-2">${c}</div>`:""}
    </div>
  `}function w(e){["marketplace","my-properties","history"].forEach(n=>{const r=document.getElementById(`tab-${n}`),s=document.getElementById(`${n}-content`);n===e?(r?.classList.remove("tab-button-inactive"),r?.classList.add("tab-button-active"),s?.classList.remove("hidden")):(r?.classList.remove("tab-button-active"),r?.classList.add("tab-button-inactive"),s?.classList.add("hidden"))})}function ce(){if(!l){u("Please connect your wallet first");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal-content">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Register New Property</h2>
        <button id="close-modal" class="text-2xl hover:opacity-70" style="color: var(--color-text-secondary)">&times;</button>
      </div>

      <form id="register-form" class="space-y-5">
        <div>
          <label class="label">Property Hash</label>
          <input
            type="text"
            id="property-hash"
            class="input-field"
            placeholder="IPFS hash or encrypted property data"
            required
          />
          <p class="text-xs mt-1" style="color: var(--color-text-secondary)">
            Enter IPFS hash (QmXx...) or any encrypted property identifier
          </p>
        </div>

        <div>
          <label class="label">Price (ETH)</label>
          <input
            type="number"
            id="property-price"
            class="input-field"
            placeholder="0.1"
            step="0.01"
            min="0"
            required
          />
          <p class="text-xs mt-1" style="color: var(--color-text-secondary)">
            Set the price in ETH for your property
          </p>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="submit" class="btn-primary flex-1">Register Property</button>
          <button type="button" id="cancel-register" class="btn-secondary flex-1">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(e),e.addEventListener("click",t=>{t.target===e&&e.remove()}),document.getElementById("close-modal")?.addEventListener("click",()=>e.remove()),document.getElementById("cancel-register")?.addEventListener("click",()=>e.remove()),document.getElementById("register-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("property-hash").value,r=document.getElementById("property-price").value;e.remove();try{a.show("Registering property on blockchain..."),await X(n,r),a.hide(),y(`Property registered successfully! Hash: ${n}, Price: ${r} ETH`),await m(),await h()}catch(s){a.hide();const o=s?.message||"Failed to register property";u(o),console.error("Registration error:",s)}})}async function le(e){try{a.show("Listing property for sale..."),await J(Number(e)),a.hide(),y("Property listed successfully!"),await m(),await h()}catch(t){a.hide(),u(t?.message||"Failed to list property")}}async function de(e){try{a.show("Delisting property..."),await Z(Number(e)),a.hide(),y("Property delisted successfully!"),await m(),await h()}catch(t){a.hide(),u(t?.message||"Failed to delist property")}}async function pe(e){const t=prompt("Enter new price in ETH:",I(e.price));if(t)try{a.show("Updating price..."),await ee(Number(e.id),t),a.hide(),y(`Price updated to ${t} ETH!`),await m(),await h()}catch(n){a.hide(),u(n?.message||"Failed to update price")}}async function ue(e){const t=I(e.price);if(confirm(`Purchase this property for ${t} ETH?`))try{a.show("Purchasing property..."),await te(Number(e.id),t),a.hide(),y("Property purchased successfully!"),await m(),await h()}catch(r){a.hide(),u(r?.message||"Failed to purchase property")}}function ye(){const e=document.createElement("div");e.className="modal-overlay";const t=W();e.innerHTML=`
    <div class="modal-content" style="max-width: 500px;">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Settings</h2>
        <button id="close-settings-modal" class="text-2xl hover:opacity-70" style="color: var(--color-text-secondary)">&times;</button>
      </div>

      <form id="settings-form" class="space-y-5">
        <div>
          <label class="label flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            WalletConnect Project ID
          </label>
          <input
            type="text"
            id="project-id-input"
            class="input-field font-mono text-sm"
            placeholder="Enter your WalletConnect Project ID"
            value="${t}"
          />
          <p class="text-xs mt-2" style="color: var(--color-text-secondary)">
            Get your free Project ID from <a href="https://cloud.walletconnect.com" target="_blank" class="text-accent hover:underline">cloud.walletconnect.com</a>
          </p>
          <p class="text-xs mt-1" style="color: var(--color-text-secondary)">
            This is optional. If not set, only injected wallets (MetaMask) will be available.
          </p>
        </div>

        <div class="card p-4" style="background: var(--color-panel-hover);">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--color-info)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-xs" style="color: var(--color-text-secondary)">
              <strong>How to get Project ID:</strong><br>
              1. Visit <a href="https://cloud.walletconnect.com/sign-in" target="_blank" class="text-accent hover:underline">cloud.walletconnect.com</a><br>
              2. Sign up or log in<br>
              3. Create a new project<br>
              4. Copy the Project ID and paste it above
            </div>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="submit" class="btn-primary flex-1">Save Settings</button>
          <button type="button" id="cancel-settings" class="btn-secondary flex-1">Cancel</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(e),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.getElementById("close-settings-modal")?.addEventListener("click",()=>e.remove()),document.getElementById("cancel-settings")?.addEventListener("click",()=>e.remove()),document.getElementById("settings-form")?.addEventListener("submit",n=>{n.preventDefault();const r=document.getElementById("project-id-input").value.trim();r?(R(r),y("Settings saved! Page will reload to apply changes.")):(E("Project ID cleared. Only MetaMask will be available."),localStorage.removeItem("walletconnect_project_id"),window.location.reload())})}document.addEventListener("DOMContentLoaded",ne);
