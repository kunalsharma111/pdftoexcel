const fs = require('fs');
const pdfparse = require('pdf-parse');

const xlsx = require('xlsx');
const path = require('path');

const ObjectsToCsv = require('objects-to-csv');

const pdffile = fs.readFileSync('test1.pdf');
let arr=[];
pdfparse(pdffile).then(function (data){
    let newData = JSON.stringify(data).replace(/\\n/g, '');
    temp = "";
    flag = 0;
    for(let i=0;i<newData.length;i++){
        if(newData[i] == "(" && newData[i+1] == "C" && newData[i+2] == "L"){
            if(flag == 0){ flag = 1;}
            else if(flag == 1){
                arr.push(temp);
                temp = "";
                flag = 0; 
            }
        }
        if(flag == 1){
            temp = temp + newData[i];
        }
    }



    hindu = [];
    finalHindu = [];
    jatsikh = [];
    divorcee = [];
    doctorEngineer = [];
    nri = [];
    allLeft = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].includes("hindu") || arr[i].includes("Hindu")){
            hindu.push(arr[i]);
        }else if(arr[i].includes("divorcee") || arr[i].includes("Divorcee")){
            divorcee.push(arr[i]);
        }else if(arr[i].includes("jat") || arr[i].includes("sikh") || arr[i].includes("Jat")|arr[i].includes("Sikh")){
            jatsikh.push(arr[i]);
        }else if(arr[i].includes("doctor") || arr[i].includes("engineer")){
            doctorEngineer.push(arr[i]);
        }else if(arr[i].includes("nri") || arr[i].includes("NRI")){
            nri.push(arr[i]);
        }else{
            allLeft.push(arr[i]);
        }
    }
    console.log(hindu.length);
    console.log(divorcee.length);
    console.log(jatsikh.length);
    console.log(doctorEngineer.length);
    console.log(allLeft.length);
    const hdata = hindu.map(h => {
        return [h];
    })
    console.log(hdata);
    // const workBook = xlsx.utils.book_new();
    // const workSheetData = [
    //     ['list'],
    //     hdata
    // ];
    for(let i=0;i<hdata.length;i++){
        let check = String(hdata[i]).replace("-"," ");
        matches = check.match(/\b\d{5}\b/g);
        console.log(matches);
        let count = 1; 
        for(let j=0;j<matches.length;j++){
            if(matches.length % 2 == 0){
                let pn = matches[j]+"-"+matches[j+1];
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                let head = (i+1) + today + "H"
                let number = pn;
                finalHindu.push({'heading':head,number:pn});
                j++;
                count++;
            }
        }
    }
    console.log(finalHindu);
    const csv = new ObjectsToCsv(finalHindu);
 
  // Save to file:
  csv.toDisk('./outputFiles/list.csv');
 
  // Return the CSV file as string:
    // filePath = './outputFiles/list.xlsx';
    // const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    // xlsx.utils.book_append_sheet(workBook,workSheet,"list");
    // xlsx.writeFile(workBook,path.resolve(filePath));
})