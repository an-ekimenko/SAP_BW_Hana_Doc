(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["inline-references"],{b3a0:function(e,n,i){"use strict";i.r(n),i.d(n,"inlineReferences",(function(){return t}));const t=(e=1)=>{const n=document.querySelectorAll(".article-body-container")[e-1],i=[...n.querySelectorAll(".headings-line .heading")],t=n.querySelector(".dropdown-content-target");i.forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("active"))return e.classList.remove("active"),void(t.innerHTML="");t.innerHTML="",i.forEach(e=>{e.classList.remove("active")}),e.classList.add("active");const n=e.nextElementSibling.innerHTML;t.innerHTML=n})})}}}]);