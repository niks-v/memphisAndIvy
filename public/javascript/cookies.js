let cookie = {
    get : (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    set : (name, value, options = {}) =>{
        options = {
            path: '/',
            // add other defaults here if necessary
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    },
    delete : (name) => {
        setCookie(name, "", {
            'max-age': -1
        });
    }
}

let cartCookie = "cart"
let priceCookie = "price"



let cart = {
    add : (pid, price, checkout = true) => {
        cookie.set(cartCookie, cookie.get(cartCookie) + "|" + pid);
        cookie.set(priceCookie, (parseFloat(cookie.get(priceCookie)) + price).toString());
        console.log(cookie.get(priceCookie))
        if(checkout)
            cart.update();
    },
    remove : (pid, price) => {
        cookie.set(priceCookie, (parseFloat(cookie.get(priceCookie)) - price).toString());
        let inCart = cookie.get(cartCookie).split("|")
        let idx = inCart.findIndex(p => p == pid); 
        inCart.splice(idx,1);  
        cookie.set(cartCookie, inCart.join('|'))
        cart.view()
    },
    clear : (dontreset) => {
        cookie.set(cartCookie, "00")
        cookie.set(priceCookie, "0")
        if(!dontreset)
            cart.view();
    },
    view : () => {
        window.location = "../../../cart/?cart=" + cookie.get(cartCookie);
    },
    update : () => {
        document.getElementById("cart-price").innerHTML = parseFloat(cookie.get(priceCookie)).toFixed(2);;
        document.getElementById("cart-num").innerHTML = cookie.get(cartCookie).split("|").length - 1;
        document.getElementById("total").innerHTML = parseFloat(cookie.get(priceCookie)).toFixed(2);;
    },
    checkout : () => {
        window.location = "../../../checkout/?cart=" + cookie.get(cartCookie);
    },
    quickCheckout : (pid, price) => {
        cart.clear(true)
        cart.add(pid, price, false)
        cart.checkout()
    },
}

if(cookie.get(priceCookie) == undefined){
    cookie.set(priceCookie, "0");
    cookie.set(cartCookie, "");
}