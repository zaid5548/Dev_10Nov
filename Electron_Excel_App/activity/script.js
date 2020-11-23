const $=require("jquery");

$(document).ready(function(){
    let db;
    let lsc;  //last selected cell


    $(".cell").on("click",function(){
        // console.log("Cell Clicked !!!");

        console.log(this);

        let rowId=Number($(this).attr("rowid"));
        let colId=Number($(this).attr("colid"));
        let cellObject=db[rowId][colId];
        let formula=cellObject.formula;
        // console.log(rowID,colID);
        let address=String.fromCharCode(65+colId)+(rowId+1);
        // console.log(address);

        $("#address").val(address);
        $("#address").val(address);
    })


    $(".cell").on("blur",function(){
        // console.log("Blur function called");
        lsc=this;
        let rowId=Number($(this).attr("rowid"));
        let colId=Number($(this).attr("colid"));

        let cellObject=db[rowId][colId];
        console.log(cellObject);

        let value=$(this).html();
        console.log(value);

        cellObject.value=value;

        console.log(db);
    })

    $("#formula").on("blur",function(){
        let formula=$(this).val(); //(A1 + A2)
        let rowId = Number($(lsc).attr("rowid"));
        let colId = Number($(lsc).attr("colid"));
        let cellObject = db[rowId][colId];

        if(cellObject.formula!=formula){
            console.log("Inside Solve");
            cellObject.formula=formula;
            let value=solveFormula(formula);
            cellObject.value=value+"";
            //UI Update
            $(lsc).html(value);
        }

    })


    function solveFormula(formula){
        let fComponents=formula.split(" ");
        // ["(", "A1", "+", "A2", ")"]
        for(let i=0;i<fComponents.length;i++){
            let fComp=fComponents[i];
            if(fComp[0]>="A" && fComp[0]<="Z"){
                let { rowId, colId } = getRowIdColIdFromAddress(fComp);
                let cellObject = db[rowId][colId];
                let value=cellObject.value;
                formula=formula.replace(fComp,value);
            }
        }
        //formula=(10 + 20 ); => Stack infix

        let value=eval(formula);
        return value;
    }

    function getRowIdColIdFromAddress(address) {
        // address => "B2"
        let colId = address.charCodeAt(0) - 65;
        let rowId = Number(address.substring(1)) - 1;
        return {
          rowId: rowId,
          colId: colId,
        };
      }



    function init(){
        db=[];
        for(let i=0;i<100;i++){
            let row=[];
            for(let j=0;j<26;j++){
                let name=String.fromCharCode(65+j)+(i+1);
                let cellObject={
                    name:name,
                    value:"",
                    formula:""
                }
                row.push(cellObject);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();

})