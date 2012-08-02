
/*
 var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
 city.lookup(ip, function(err, data) {
 if (err) {throw err;}
 if (data) {
 console.log(data);
 var location = data.city + ', ' + data.region + ' ' + data.postal_code + ', ' + data.country_name + ' @ (' + data.latitude + ', ' + data.longitude + ')' ;
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.end('<p>Salutations ' + location + '</p>\n');
 }
 });
    */