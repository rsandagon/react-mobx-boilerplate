
export function currencyFormatter(currency, value) {
    var currencySymbol = 'CNY'
    var formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    switch (currency) {
        case 'USD':
            currencySymbol = '$'
            break
        case 'CNY':
            currencySymbol = '¥'
            break
        //add more
    }

    return currencySymbol.concat(formattedValue)
}

export function timeFormatter(seconds)
{
    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

export function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { 
    }

    return false;
};
