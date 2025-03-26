export function start_loading(el,text,newtext,count,time) {
    let t=time;
      el.classList.add("loading_element");
        el.disabled=true;
                let c=setInterval(() => {
                    t-=1;
                    console.log(t);
                    if (count===true) {
                      el.textContent = text + " 00:" + t;
                    }else if(count===false){
                      el.textContent = text;
                    }
                
                el.classList.add("loading_element");
                if(t==0){
                    el.disabled = false;
                    el.textContent = newtext;
                    t = time;
                    clearInterval(c);
                    el.classList.remove("loading_element");
                }
                }, 1000);
    }