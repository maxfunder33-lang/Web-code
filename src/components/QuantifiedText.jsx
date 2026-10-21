import React from 'react';

// Match complete amounts/ranges with units, preserving the original copy verbatim.
// Dates, contact information and illustration-only prices are outside the fields using this component.
const quantified=/(\$\s*\d+(?:,\d{3})*(?:\.\d+)?(?:\s*[w万])?|[+＋]?\d+(?:,\d{3})*(?:\.\d+)?(?:\s*%?\s*[–—~－-]\s*\d+(?:\.\d+)?)?\s*(?:%|万\s*(?:美元|人民币|元|DAU)?|项(?:\s*维度)?|天|年\+?)(?:\s*(?:以上|人民币))?\+?|百万\s*DAU)/g;

export default function QuantifiedText({children,enabled=false}){
 if(!enabled||typeof children!=='string')return children;
 return children.split(quantified).map((part,i)=>i%2===1?<strong className="result-emphasis" key={i}>{part}</strong>:part);
}
