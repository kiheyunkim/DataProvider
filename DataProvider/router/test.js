import jsZip from 'jszip';
import saveAs from 'file-saver';
let func = async ()=>{
    
}


//4. 찾은 파일들 압축 하여 한 파일로 만듦
let zip = new jsZip();
zip.file(__dirname + '1.txt',textData);
zip.file(__dirname + '2.txt');

zip.generateAsync({type : "nodebuffer"}).then((blob)=>{
    saveAs(blob,"test.zip");
})
