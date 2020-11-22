const $=require("jquery");

$(document).ready(function(){
    let db;
    $(".cell").on("click",function(){
        // console.log("Cell Clicked !!!");

        console.log(this);

        let rowID=Number($(this).attr("rowid"))+1;
        let colID=Number($(this).attr("colid"));
        // console.log(rowID,colID);
        let address=String.fromCharCode(65+colID)+rowID;
        console.log(address);

        $("#address").val(address);
    })


    $(".cell").on("blur",function(){
        // console.log("Blur function called");
        let rowID=Number($(this).attr("rowid"));
        let colID=Number($(this).attr("colid"));

        let cellObject=db[rowID][colID];
        console.log(cellObject);

        let value=$(this).html();
        console.log(value);

        cellObject.val=value;

        // console.log(db);
    })



    function init(){
        db=[];
        for(let i=0;i<100;i++){
            let row=[];
            for(let j=0;j<26;j++){
                let name=String.fromCharCode(65+j)+(i+1);
                let cellObject={
                    name:name,
                    value:""
                }
                row.push(cellObject);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();

})