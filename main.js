const AbsValue = (value) => {
    var ret = value >= 0 ? value : (value * -1);
    return (ret);
}

// Function to find the square root of n
function findSqrt(n) {
    var i = 1;

    // While the square root is not found
    var found = false;
    while (!found) {

        // If n is a perfect square
        if (i * i == n) {
            //  console.log("i is :",i);
            found = true;
            return (i);
        }

        else if (i * i > n) {

            // Square root will lie in the
            // interval i-1 and i
            var res = Square(n, i - 1, i);
            //  console.log("result is : ",res.toFixed(5));
            found = true;
            return (res);
        }
        i++;
    }
}

function Square(n, i, j) {
    var mid = ((i + j) / 2);
    var mul = mid * mid;

    // If mid itself is the square root,
    // return mid
    if ((mul == n) || (AbsValue(mul - n) < 0.00001))
        return mid;

    // If mul is less than n,
    // recur second half
    else if (mul < n)
        return Square(n, mid, j);

    // Else recur first half
    else
        return Square(n, i, mid);
}

function ft_sort(poly, sym)
{
    var i = 0
    var max
    while(i < poly.length)
    {
        if(sym == 1)
        {
            if (poly[i + 1] && poly[i].exp > poly[i + 1].exp)
            {
                max = poly[i + 1]
                poly[i + 1] = poly[i]
                poly[i] = max
                i = 0;
            }
        }
        else
        {
            if (poly[i + 1] && poly[i].exp < poly[i + 1].exp)
            {
                max = poly[i + 1]
                poly[i + 1]= poly[i]
                poly[i] = max
                i = -1
            }
        }
        i++
    }
    return(poly)
}
function ft_calcul(poly)
{
    var delta;
    var a = 0;
    var b = 0;
    var c = 1;
    var max = 0;
    for(var i = 0; i < poly.length; i++)
    {
        if (max < poly[i].exp) 
            max = poly[i].exp
        if (poly[i].exp == 2) 
            a = poly[i].cst
        if (poly[i].exp == 1) 
            b = poly[i].cst
        if (poly[i].exp == 0) 
            c = poly[i].cst
    }
    if (max <= 0)
        console.log('\x1b[31m', 'There is no Solution' ,'\x1b[0m')
    if (max > 2){
        console.log('Polynomial degree: '+max)
        console.log("The polynomial degree is stricly greater than 2, I can't solve.")
    }
    if (max == 2)
    {
        console.log('Polynomial degree: '+max)
        delta = (b * b) - (4 * a * c)
        console.log("delta: "+delta)
        if  (delta == 0)
        {
            if (-b / (2 * a))
            {
                console.log("The solution is:")
                console.log(-b / (2 * a))
            }
            else
                console.log("all real numbers are solution")

        }
        else  if (delta > 0)
        {
            console.log("Discriminant is strictly positive, the two solutions are:")
            console.log((- b - findSqrt(delta)) / (2 * a))
            console.log((- b + findSqrt(delta)) / (2 * a))
        }
        else if(delta < 0)
        {
            console.log("Has a solution in C")
            console.log(-b + '/' + (2*a),'+ i * '+ findSqrt(-delta)+'/'+(2*a))
            console.log(-b + '/' + (2*a),'- i * '+ findSqrt(-delta)+'/'+(2*a))
        }
    }
    if (max == 1)
    {   
        console.log('Polynomial degree: '+max)
        poly = ft_sort(poly, 1)
        var result = 0;
        for (var i = 0; i < poly.length; i++)
        {
            if (poly[i].exp == 0)
                result += -poly[i].cst
            else
                result /= poly[i].cst
        }
        console.log("There is One solution is :")
        console.log(result)
    }
}

function ft_reduce(poly)
{
    var reduce_form = []
    var j;
    var remove;
    var result
    
    for(var i = 0; i < poly.length; i++)
    {
        j = 0;
        result = poly[i].cst
        while(j < poly.length)
        {
            if (poly[i].exp === poly[j].exp && i != j)
            {
                result = parseFloat(result) + parseFloat(poly[j].cst) 
                poly[j].cst = 0
            }
            j++;
        }
        poly[i].cst = 0
        reduce_form.push({cst: result, exp: poly[i].exp})
    }
    let f_result = []
    for(let x = 0; x < reduce_form.length; x++)
    {
        if (reduce_form[x].cst != 0){
           f_result.push(reduce_form[x])
        }
    }
    return(f_result);
}
function ft_stock(str){
    var poly = {
        exp: null,
        cst: null
    }
    var sym = 0
    var sign = 0;
    var res = []
    
    for(var i = 0; i < str.length; i++){
        
        if(str[i] == '-')
            sign = 1
        if(str[i].match(/^[+-]?([0-9]*[.])?[0-9]+$/g))
        {
            poly.cst = (sign == 0) ? str[i] : -1 * str[i]
            sign = 0
        }
        if (str[i].match(/[xX]{1}\^\d+/g)){
            sym = 1;
            poly.exp = (/\d+/g).exec(str[i])[0];
        }
        if (sym == 1){
            res.push({cst: poly.cst, exp: poly.exp})
            sym = 0;
        }
        if (str[i] == '=')
            break
    }
    return(res)
}

if (process.argv[2] && process.argv[2].match(/^((?:\-?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\-?\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$/g))
{
    var t = '';
    var tmp = process.argv[2].split("=")[1]
    var res = process.argv[2].split(" ")
    res = ft_stock(res);
    tmp = ft_stock(tmp.split(' ')) 
    for(var j = 0; j < tmp.length; j++)
    {
        tmp[j].cst *= -1
        res.push(tmp[j])
    }
    
    res = ft_reduce(res)
    if (res.length > 0)
    {
        res = ft_sort(res, 0)
        for(let i = 0; i < res.length; i++)
        {
            t +=  res[i].cst + ' * X^'+res[i].exp + ' '
            if (typeof res[i + 1] !== 'undefined')
                t += ' + ' 
        }
        console.log("Reduced form: "+t+ " = 0")
        ft_calcul(res) 
    }
    else
        console.log('\x1b[31m', 'There is no Solution' ,'\x1b[0m');   
}
else{
    console.log('\x1b[31m', 'Syntax Error' ,'\x1b[0m');
}