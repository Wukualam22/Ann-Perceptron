var tabel = document.getElementById("table"),
    tampilw1Akhir = document.getElementById("bobotAkhirW1"),
    tampilw2Akhir = document.getElementById("bobotAkhirW2"),
    tampilw3Akhir = document.getElementById("bobotAkhirW3"),
    inputLaju;

var dh1 = 0.8;
var du1 = 0.1;
var dg1 = 0.5;

var dh2 = 0.2;
var du2 = 0.7;
var dg2 = 0.6;

var arrLaju = 0.9;

var data = {
    Harta: [1.2, 0.8, 1.1, 0.4, 0.5],
    Utang: [0.3, 0.6, 1, 1, 1.5],
    Gaji: [1.6, 0.95, 0.8, 0.65, 0.75],
    Status: [1, 1, 1, 0, 0]
}

//variabel bobot
var w1 = -1.1; w2 = 1.2 ; w3 = 2;
var bobotBias = 0;
var T = 0;
//variabel perizinan
var ulang = true,
    pelatihan = false;

console.log(data.Harta[1])

function hitungY(v) {
    var y = 0;
    if (v >= T) {
        y = 1;
    }
    if (v < T) {
        y = 0;
    }
    console.log("y = " + y);
    return y;
}

function hitungV(Harta, Utang, Gaji) {
    var hitung = ((Harta * w1) + (Utang * w2) + (Gaji * w3) + bobotBias);

    console.log("v = " + hitung)
    return hitung;
}

var w1ubah = 0,
    w2ubah = 0,
    w3ubah = 0;

function perubahan(x, y) {
    w1ubah = arrLaju * (data.Status[x] - y) * data.Harta[x]
    w2ubah = arrLaju * (data.Status[x] - y) * data.Utang[x]
    w3ubah = arrLaju * (data.Status[x] - y) * data.Gaji[x]


    w1 = w1ubah + w1;
    w2 = w2ubah + w2;
    w3 = w3ubah + w3;



}
    // if(w1 == ''&& w2 == '' && w3 == '' && inputLaju == ''){
    //     alert("Masukkan input !");
    // }else{

    console.log(w1 + "  " + w2 + "  " + w3)

    pelatihan = true;
    alert("memulai latihan")
    var iter = 1;
    //Perulangan untuk uji
    while (ulang == true) 
    {
        ulang = false;
        console.log("Iterasi = " + iter);
        for (var j = 0; j < data.Harta.length; j++) {
            var tr = '<tr><td>' + iter + '</td>';
            var v = hitungV(data.Harta[j], data.Utang[j], data.Gaji[j]);
            var y = hitungY(v);

            console.log(j)
            var eror = data.Status[j] - y;
            tr += '<td>[' + data.Harta[j] + ' ' + data.Utang[j] + ' ' + data.Gaji[j] + ']</td><td>' + v + '</td><td>' + y + '</td>'
            tr += '<td>' + data.Status[j] + '</td><td>' + eror + '</td>'
            if (y == data.Status[j]) {
                w1ubah = 0, w2ubah = 0, w3ubah = 0;
            } else {
                ulang = true; //melakukan uji ulang apabila ada eror
                perubahan(j, y);
            }
            tr += '<td>[' + w1ubah + ' ' + w2ubah + ' ' + w3ubah + ']</td>'
            tr += '<td>[' + w1 + ' ' + w2 + ' ' + w3 + '],[' + bobotBias + ']</td>'

            tr += '</tr>'
            tabel.innerHTML += tr;
        }
        iter++;



    tampilw1Akhir.innerHTML = w1;
    tampilw2Akhir.innerHTML = w2;
    tampilw3Akhir.innerHTML = w3;

    }
    if (pelatihan == false) 
    {
        alert("Lakukan pelatihan data terlebih dahulu !")
    } 
    else 
    {
        if (dh1 == '' && dg1 == '' && du1 == '') {
            alert("masukkan input !");
        } else {
            var vnya = hitungV(dh1, du1, dg1);
            var ynya = hitungY(vnya);

            document.getElementById("outputStatus").innerHTML = ynya;
        }
    }

    if (pelatihan == false) 
    {
        alert("Lakukan pelatihan data terlebih dahulu !")
    } 
    else 
    {
        if (dh2 == '' && dg2 == '' && du2 == '') {
            alert("masukkan input !");
        } else {
            var vnya = hitungV(dh2, du2, dg2);
            var ynya = hitungY(vnya);

            document.getElementById("outputStatus2").innerHTML = ynya;
        }
    }