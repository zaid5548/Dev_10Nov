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
        // console.log(cellObject);

        let value=$(this).html();
        // console.log(value);

        if(value!=cellObject.value){
            cellObject.value=value;
            if(cellObject.formula){
                removeFormula(cellObject);
            }
            updateChildrens(cellObject);
        }


        console.log(db);
    })

    function removeFormula(cellObject){
        for(let i=0;i<cellObject.length;i++){
            let parentName=cellObject.parents[i];
            let {rowId,colId}=getRowIdColIdFromAddress(parentName);
            let parentCellObject=db[rowId][colId];
            let newChildrens=parentCellObject.newChildrens.filter(function(child){
                return child !=cellObject.name;
            });
            parentCellObject.newChildrens=newChildrens;
        }
        cellObject.parents=[];
        cellObject.formula="";
    }

    function updateChildrens(cellObject){
        // {
    //     name:"A1",
    //     value:"100",
    //     formula:"",
    //     childrens:["B1"]
    // }

        for(let i=0;i<cellObject.length;i++){
            let childrenName=cellObject.childrens[i]; //B1
            let {rowId,colId} =getRowIdColIdFromAddress(childrenName);// rowId , colId of B1
            let childrenCellObject=db[rowId][colId];//  cellobject of B1
            let updateValue=solveFormula(childrenCellObject.formula);// get update value of B1
            childrenCellObject.value=updateValue+"";// update db of B1
             //.cell[rowid="0"][colid="1"]
             $(`.cell[rowid=${rowId}][colid=${colId}]`).html(updateValue); // update ui of B1
             updateChildrens(childrenCellObject);
        }
        
    }

    $("#formula").on("click", function () {
        let rowId = Number($(lsc).attr("rowid"));
        let colId = Number($(lsc).attr("colid"));
        let cellObject = db[rowId][colId];
      });


    $("#formula").on("blur",function(){
        let formula=$(this).val(); //(A1 + A2)
        let rowId = Number($(lsc).attr("rowid"));
        let colId = Number($(lsc).attr("colid"));
        let cellObject = db[rowId][colId];

        if(cellObject.formula!=formula){
            console.log("Inside Solve");
            removeFormula(cellObject); //case 4 k lia
            cellObject.formula=formula; // niche tk case 2
            let value=solveFormula(formula,cellObject);
            //db update
            cellObject.value=value+"";
            //UI Update
            $(lsc).html(value);
            updateChildrens(cellObject);
        }

    })


    function solveFormula(formula,selfCellObject){
        //formula = "( A1 + A2 )";
        let fComponents=formula.split(" ");
        // ["(", "A1", "+", "A2", ")"]
        for(let i=0;i<fComponents.length;i++){
            let fComp=fComponents[i];
            if(fComp[0]>="A" && fComp[0]<="Z"){
                 // A1 => rowId , colId
                let { rowId, colId } = getRowIdColIdFromAddress(fComp);
                let cellObject = db[rowId][colId];
                // add self to childrens of A1 and A2
                if(selfCellObject){
                    addSelfToChildrensOfParent(cellObject, selfCellObject);
                    addParentsToSelfObject(cellObject, selfCellObject);
                }
                let value=cellObject.value;
                formula=formula.replace(fComp,value);
            }
        }
        //formula=(10 + 20 ); => Stack infix

        let value=eval(formula);
        return value;
    }

    function addSelfToChildrensOfParent(cellObject, selfCellObject) {
        cellObject.childrens.push(selfCellObject.name);
      }
    
      function addParentsToSelfObject(cellObject, selfCellObject) {
        selfCellObject.parents.push(cellObject.name);
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
                    formula:"",
                    childrens:[],
                    parents:[]
                }
                row.push(cellObject);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();

})