import{i as T,a as N,d as S,s as L,e as g,f as P,h as v,r as w,j as _,k as A,l as C,m as F,n as D}from"./wagmi-DkQJbt0H.js";import{h as U}from"./viem-DwaIjzdB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const z=()=>{if(typeof window<"u"&&typeof localStorage<"u"){const e=localStorage.getItem("walletconnect_project_id");if(e)return e}return null},M=z(),O=M?[T(),N({projectId:M})]:[T()],a=S({chains:[L],connectors:O,transports:{[L.id]:U()}}),R=e=>{localStorage.setItem("walletconnect_project_id",e),window.location.reload()},W=()=>localStorage.getItem("walletconnect_project_id")||"";function E(e,t="info",n=3e3){const r=document.querySelector(".toast");r&&r.remove();const o=document.createElement("div");o.className=`toast toast-${t}`,o.textContent=e,document.body.appendChild(o),setTimeout(()=>{o.remove()},n)}function u(e){E(e,"error",4e3)}function y(e){E(e,"success",3e3)}function I(e){E(e,"info",3e3)}var q=Object.defineProperty,Y=(e,t,n)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,B=(e,t,n)=>Y(e,typeof t!="symbol"?t+"":t,n);class V{constructor(){B(this,"element",null),B(this,"overlay",null)}show(t="Loading..."){this.hide(),this.overlay=document.createElement("div"),this.overlay.className="modal-overlay",this.element=document.createElement("div"),this.element.className="modal-content flex flex-col items-center gap-4",this.element.innerHTML=`
      <div class="spinner"></div>
      <p class="text-white text-lg">${t}</p>
    `,this.overlay.appendChild(this.element),document.body.appendChild(this.overlay)}hide(){this.overlay&&(this.overlay.remove(),this.overlay=null,this.element=null)}update(t){if(this.element){const n=this.element.querySelector("p");n&&(n.textContent=t)}}}const s=new V,G=[{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"properties",outputs:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"address",name:"owner",type:"address"},{internalType:"string",name:"propertyHash",type:"string"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"bool",name:"isListed",type:"bool"},{internalType:"uint256",name:"listedAt",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"transactions",outputs:[{internalType:"uint256",name:"propertyId",type:"uint256"},{internalType:"address",name:"seller",type:"address"},{internalType:"address",name:"buyer",type:"address"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"timestamp",type:"uint256"},{internalType:"bool",name:"completed",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"userProperties",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint256",name:"",type:"uint256"}],name:"userTransactions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"string",name:"_propertyHash",type:"string"},{internalType:"uint256",name:"_price",type:"uint256"}],name:"registerProperty",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"listProperty",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"delistProperty",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"},{internalType:"uint256",name:"_newPrice",type:"uint256"}],name:"updatePrice",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"purchaseProperty",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address",name:"_owner",type:"address"}],name:"getPropertiesByOwner",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getTransactionsByUser",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getListedProperties",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getTotalProperties",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getTotalTransactions",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_propertyId",type:"uint256"}],name:"getProperty",outputs:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"address",name:"owner",type:"address"},{internalType:"string",name:"propertyHash",type:"string"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"bool",name:"isListed",type:"bool"},{internalType:"uint256",name:"listedAt",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_transactionId",type:"uint256"}],name:"getTransaction",outputs:[{internalType:"uint256",name:"propertyId",type:"uint256"},{internalType:"address",name:"seller",type:"address"},{internalType:"address",name:"buyer",type:"address"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"timestamp",type:"uint256"},{internalType:"bool",name:"completed",type:"bool"}],stateMutability:"view",type:"function"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"}],name:"PropertyRegistered",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"}],name:"PropertyListed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"}],name:"PropertyDelisted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!0,internalType:"address",name:"buyer",type:"address"},{indexed:!0,internalType:"address",name:"seller",type:"address"},{indexed:!1,internalType:"uint256",name:"price",type:"uint256"}],name:"PropertyPurchased",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"uint256",name:"propertyId",type:"uint256"},{indexed:!1,internalType:"uint256",name:"oldPrice",type:"uint256"},{indexed:!1,internalType:"uint256",name:"newPrice",type:"uint256"}],name:"PriceUpdated",type:"event"}],l="0xD90c73b42952565F334E5FB6C349B0005ac06669",p=G;async function j(e){const t=await w(a,{address:l,abi:p,functionName:"getProperty",args:[BigInt(e)]}),[n,r,o,i,c,$]=t;return{id:n,owner:r,propertyHash:o,price:i,isListed:c,listedAt:$}}async function K(){return await w(a,{address:l,abi:p,functionName:"getListedProperties"})}async function Q(e){return await w(a,{address:l,abi:p,functionName:"getPropertiesByOwner",args:[e]})}async function X(){return await w(a,{address:l,abi:p,functionName:"getTotalProperties"})}async function J(e,t){try{const n=await g(a,{address:l,abi:p,functionName:"registerProperty",args:[e,P(t)],gas:BigInt(5e5)});return await v(a,{hash:n})}catch(n){const r=n?.message||"";throw r.includes("Property hash cannot be empty")?new Error("Property hash is required."):r.includes("Price must be greater than 0")?new Error("Price must be greater than 0 ETH."):r.includes("User rejected")?new Error("Transaction was cancelled."):r.includes("insufficient funds")?new Error("Insufficient funds for gas fees."):new Error("Failed to register property. Please try again.")}}async function Z(e){try{const t=await g(a,{address:l,abi:p,functionName:"listProperty",args:[BigInt(e)],gas:BigInt(3e5)});return await v(a,{hash:t})}catch(t){const n=t?.message||"";throw n.includes("Not property owner")?new Error("You are not the owner of this property."):n.includes("Property already listed")?new Error("This property is already listed for sale."):n.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Failed to list property. Please try again.")}}async function ee(e){try{const t=await g(a,{address:l,abi:p,functionName:"delistProperty",args:[BigInt(e)],gas:BigInt(3e5)});return await v(a,{hash:t})}catch(t){const n=t?.message||"";throw n.includes("Not property owner")?new Error("You are not the owner of this property."):n.includes("Property not listed")?new Error("This property is not currently listed."):n.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Failed to delist property. Please try again.")}}async function te(e,t){try{const n=await g(a,{address:l,abi:p,functionName:"updatePrice",args:[BigInt(e),P(t)],gas:BigInt(3e5)});return await v(a,{hash:n})}catch(n){const r=n?.message||"";throw r.includes("Not property owner")?new Error("You are not the owner of this property."):r.includes("Price must be greater than 0")?new Error("Price must be greater than 0 ETH."):r.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Failed to update price. Please try again.")}}async function ne(e,t){try{const n=await g(a,{address:l,abi:p,functionName:"purchaseProperty",args:[BigInt(e)],value:P(t),gas:BigInt(5e5)});return await v(a,{hash:n})}catch(n){const r=n?.message||"";throw r.includes("Cannot buy your own property")?new Error("You cannot purchase your own property. Please use a different wallet address."):r.includes("Property not listed")?new Error("This property is not listed for sale."):r.includes("Insufficient payment")?new Error("Payment amount is insufficient. Please check the property price."):r.includes("Property does not exist")?new Error("Property not found. It may have been removed."):r.includes("insufficient funds")?new Error("Insufficient funds in your wallet. Please add more ETH."):r.includes("User rejected")?new Error("Transaction was cancelled."):new Error("Transaction failed. Please try again or contact support.")}}function k(e){return _(e)}let d;function re(){const e=document.querySelector("#app");e.innerHTML=oe(),ie(),ce(),I("Welcome to Private Property Trading Platform")}function oe(){return`
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
  `}function ie(){document.getElementById("connect-btn")?.addEventListener("click",se),document.getElementById("disconnect-btn")?.addEventListener("click",ae),document.getElementById("register-property-btn")?.addEventListener("click",le),document.getElementById("settings-btn")?.addEventListener("click",me),document.getElementById("tab-marketplace")?.addEventListener("click",()=>x("marketplace")),document.getElementById("tab-my-properties")?.addEventListener("click",()=>x("my-properties")),document.getElementById("tab-history")?.addEventListener("click",()=>x("history")),A(a,{onChange(e){d=e.address,b()}})}async function se(){try{s.show("Connecting to wallet..."),await F(a,{connector:T()}),d=C(a).address,b(),y("Wallet connected successfully!"),s.hide()}catch(e){s.hide(),u(e.message||"Failed to connect wallet")}}async function ae(){try{await D(a),d=void 0,b(),I("Wallet disconnected")}catch(e){u(e.message||"Failed to disconnect")}}function ce(){const e=C(a);e.isConnected&&(d=e.address,b())}function b(){const e=document.getElementById("connect-btn"),t=document.getElementById("account-info"),n=document.getElementById("account-address"),r=document.getElementById("account-initial");if(d){if(e?.classList.add("hidden"),t?.classList.remove("hidden"),n){const o=`${d.slice(0,6)}...${d.slice(-4)}`;n.textContent=o}r&&(r.textContent=d.slice(2,3).toUpperCase()),m(),h()}else e?.classList.remove("hidden"),t?.classList.add("hidden")}async function m(){const e=document.getElementById("listed-properties");if(e)try{s.show("Loading properties...");const t=await X();if(console.log("Total properties:",t),t===BigInt(0)){e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-text-secondary)">No properties registered yet. Register your first property!</p>',s.hide();return}const n=await K();if(n.length===0){e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-text-secondary)">No properties listed for sale yet</p>',s.hide();return}const r=[];for(const o of n)try{const i=await j(Number(o));r.push(i)}catch(i){console.error(`Failed to load property ${o}:`,i)}e.innerHTML=r.map(o=>H(o,!1)).join(""),r.forEach(o=>{document.getElementById(`purchase-${o.id}`)?.addEventListener("click",()=>ye(o))}),s.hide()}catch(t){s.hide(),console.error("Error loading properties:",t);const n=t?.message||"Unknown error";n.includes("reverted")||n.includes("execution")?e.innerHTML=`
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
            Contract: <code class="font-mono">${l}</code>
          </p>
        </div>
      `:e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-error)">Failed to load properties</p>'}}async function h(){const e=document.getElementById("my-properties-list");if(!(!e||!d))try{const t=await Q(d);if(t.length===0){e.innerHTML=`<p class="text-center col-span-full" style="color: var(--color-text-secondary)">You don't own any properties yet</p>`;return}const n=[];for(const r of t)try{const o=await j(Number(r));n.push(o)}catch(o){console.error(`Failed to load property ${r}:`,o)}e.innerHTML=n.map(r=>H(r,!0)).join(""),n.forEach(r=>{const o=document.getElementById(`list-${r.id}`),i=document.getElementById(`delist-${r.id}`),c=document.getElementById(`update-price-${r.id}`);o?.addEventListener("click",()=>de(r.id)),i?.addEventListener("click",()=>pe(r.id)),c?.addEventListener("click",()=>ue(r))})}catch(t){console.error("Error loading my properties:",t),e.innerHTML='<p class="text-center col-span-full" style="color: var(--color-error)">Failed to load your properties</p>'}}function H(e,t){const n=k(e.price),r=`${e.propertyHash.slice(0,10)}...${e.propertyHash.slice(-8)}`,o=`${e.owner.slice(0,6)}...${e.owner.slice(-4)}`,i=e.isListed?'<span class="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-success to-accent text-white">Listed</span>':'<span class="px-2 py-1 text-xs rounded-full" style="background: var(--color-panel); color: var(--color-text-secondary)">Unlisted</span>';let c="";return t?e.isListed?c=`
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
        ${i}
      </div>

      <div class="space-y-3 mb-5">
        <div>
          <p class="text-xs mb-1" style="color: var(--color-text-secondary)">Property Hash</p>
          <p class="text-sm font-mono">${r}</p>
        </div>

        <div>
          <p class="text-xs mb-1" style="color: var(--color-text-secondary)">Owner</p>
          <p class="text-sm font-mono">${o}</p>
        </div>

        <div>
          <p class="text-xs mb-1" style="color: var(--color-text-secondary)">Price</p>
          <p class="text-2xl font-bold text-gradient">${n} ETH</p>
        </div>
      </div>

      ${c?`<div class="flex gap-2">${c}</div>`:""}
    </div>
  `}function x(e){["marketplace","my-properties","history"].forEach(n=>{const r=document.getElementById(`tab-${n}`),o=document.getElementById(`${n}-content`);n===e?(r?.classList.remove("tab-button-inactive"),r?.classList.add("tab-button-active"),o?.classList.remove("hidden")):(r?.classList.remove("tab-button-active"),r?.classList.add("tab-button-inactive"),o?.classList.add("hidden"))})}function le(){if(!d){u("Please connect your wallet first");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),e.addEventListener("click",t=>{t.target===e&&e.remove()}),document.getElementById("close-modal")?.addEventListener("click",()=>e.remove()),document.getElementById("cancel-register")?.addEventListener("click",()=>e.remove()),document.getElementById("register-form")?.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("property-hash").value,r=document.getElementById("property-price").value;e.remove();try{s.show("Registering property on blockchain..."),await J(n,r),s.hide(),y(`Property registered successfully! Hash: ${n}, Price: ${r} ETH`),await m(),await h()}catch(o){s.hide();const i=o?.message||"Failed to register property";u(i),console.error("Registration error:",o)}})}async function de(e){try{s.show("Listing property for sale..."),await Z(Number(e)),s.hide(),y("Property listed successfully!"),await m(),await h()}catch(t){s.hide(),u(t?.message||"Failed to list property")}}async function pe(e){try{s.show("Delisting property..."),await ee(Number(e)),s.hide(),y("Property delisted successfully!"),await m(),await h()}catch(t){s.hide(),u(t?.message||"Failed to delist property")}}async function ue(e){const t=prompt("Enter new price in ETH:",k(e.price));if(t)try{s.show("Updating price..."),await te(Number(e.id),t),s.hide(),y(`Price updated to ${t} ETH!`),await m(),await h()}catch(n){s.hide(),u(n?.message||"Failed to update price")}}async function ye(e){const t=k(e.price);if(confirm(`Purchase this property for ${t} ETH?`))try{s.show("Purchasing property..."),await ne(Number(e.id),t),s.hide(),y("Property purchased successfully!"),await m(),await h()}catch(r){s.hide(),u(r?.message||"Failed to purchase property")}}function me(){const e=document.createElement("div");e.className="modal-overlay";const t=W();e.innerHTML=`
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
  `,document.body.appendChild(e),e.addEventListener("click",n=>{n.target===e&&e.remove()}),document.getElementById("close-settings-modal")?.addEventListener("click",()=>e.remove()),document.getElementById("cancel-settings")?.addEventListener("click",()=>e.remove()),document.getElementById("settings-form")?.addEventListener("submit",n=>{n.preventDefault();const r=document.getElementById("project-id-input").value.trim();r?(R(r),y("Settings saved! Page will reload to apply changes.")):(I("Project ID cleared. Only MetaMask will be available."),localStorage.removeItem("walletconnect_project_id"),window.location.reload())})}console.log("Main.ts loaded successfully");const f=e=>{const t=document.getElementById("app");t&&(t.innerHTML=e)};window.addEventListener("load",()=>{console.log("Window loaded"),f(`
    <div style="color: white; padding: 20px; text-align: center;">
      <h2>Initializing...</h2>
      <p>Loading application...</p>
    </div>
  `)});document.addEventListener("DOMContentLoaded",()=>{console.log("DOM loaded, initializing app"),f(`
    <div style="color: white; padding: 20px; text-align: center;">
      <h2>Starting Application...</h2>
      <p>Contract Address: ${l}</p>
    </div>
  `);try{console.log("Calling initializeApp()"),re(),console.log("initializeApp() completed successfully")}catch(e){console.error("Failed to initialize app:",e),f(`
      <div style="color: white; padding: 20px; text-align: center;">
        <h1 style="color: #ef5350;">Application Error</h1>
        <p>Failed to initialize. Check console for details.</p>
        <pre style="color: #ef5350; text-align: left; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; max-width: 800px; margin: 20px auto; overflow-x: auto;">${String(e)}

Stack: ${e instanceof Error?e.stack:"N/A"}</pre>
        <p style="margin-top: 20px;">Contract: ${l}</p>
      </div>
    `)}});window.addEventListener("error",e=>{console.error("Global error caught:",e.error),f(`
    <div style="color: white; padding: 20px; text-align: center;">
      <h1 style="color: #ef5350;">Runtime Error</h1>
      <p>${e.message}</p>
      <pre style="color: #ef5350; text-align: left; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; max-width: 800px; margin: 20px auto; overflow-x: auto;">${e.error?String(e.error.stack||e.error):"Unknown error"}</pre>
    </div>
  `)});window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason),f(`
    <div style="color: white; padding: 20px; text-align: center;">
      <h1 style="color: #ef5350;">Promise Rejection</h1>
      <p>An async operation failed</p>
      <pre style="color: #ef5350; text-align: left; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; max-width: 800px; margin: 20px auto; overflow-x: auto;">${String(e.reason)}</pre>
    </div>
  `)});
