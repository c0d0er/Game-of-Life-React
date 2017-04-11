/*
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
var arr = [];
var x=[];
var setInter;
var gen=0;
var change;
var row=25, column=40;
var speed =1;

const set1=()=>{
  clearInterval(setInter)
    setInter=false;
  if(!setInter){setInter=setInterval(change, speed);}
};

let boardArr = (row, column, initial, random=false) => {
  arr=JSON.parse(JSON.stringify([]));
  for(let i=0; i<row; i++){
  arr[i]=[];
  for(let j=0; j<column; j++){
    if(!random){arr[i][j]=[initial, random];}
    else{arr[i][j]=[Math.round(Math.random()), random];}
  }
}
x=JSON.parse(JSON.stringify(arr));
return arr;
}

const Td = (props) => { 
  let td1 = props.data.map((v,j)=>{
    let cName=v[1];
    //if(props.state[props.ind][j]===1){cName='live';}
    return (<td id={props.ind+'-'+j} className={cName} onClick={props.add}></td>)
  });
  return (<div>{td1}</div>)
}

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state={
      board: boardArr(row, column, 0, true)
    }
  }

  tableMaker = () => {
    return this.state.board.map((val, i)=>{
        return (       
          <tr id={'i-'+i}>          
            <Td state={this.state.board} 
            data={val} ind={i} add={this.handleAdd} />            
          </tr>        
      )               
    })
  };

  componentDidMount () {
    change= () => {      
      this.state.board.forEach((row, i)=>{
  row.forEach((col, j)=>{
let lastRow=arr.length-1,
    lastCol=arr[0].length-1,
    prevRow=i-1<0?lastRow:i-1,
    prevCol=j-1<0?lastCol:j-1,
    nextRow=i+1>lastRow?0:i+1,
    nextCol=j+1>lastCol?0:j+1,
    sum=arr[prevRow][prevCol][0]+arr[prevRow][j][0]+arr[prevRow][nextCol][0]+arr[i][prevCol][0]+arr[i][nextCol][0]+arr[nextRow][prevCol][0]+arr[nextRow][j][0]+arr[nextRow][nextCol][0];
    if(col[0]===0){
      if(sum===3){x[i][j][0]=1;x[i][j][1]='new';}
      else {x[i][j][0]=0;x[i][j][1]='zero'};
    }

    else if(col[0]===1){
      if(sum<2){x[i][j][0]=0;x[i][j][1]='killed';}
      else if(sum>3){x[i][j][0]=0;x[i][j][1]='killed';}
        else if(sum===3||sum===2){x[i][j][0]=1;x[i][j][1]='live';}
        }
      })
    })   
      if(arr.toString()!==x.toString()){gen++}//compare 2 arrays, when they are same, generation counting stops;
    arr=$.extend(true, [], x);//arr=JSON.parse(JSON.stringify(x));
    

    this.setState({board:arr})    
    };
    set1();//clearInterval(setInter);setInter=false;if(!setInter){setInter=setInterval(change, 1);}
  };

  handleRandom = () => {    
    gen=0;
    this.setState({board: boardArr(row, column, 0, true)});
   set1();//clearInterval(setInter)//setInter=false;//if(!setInter){setInter=setInterval(change, 1);} 
  };

  handleAdd = (e) => {
    console.log(this.state.board)
    let idName=e.target.id.split('-');//return current clicking tag id name's array, idName[0]=row, idName[1]=column;
    console.log(idName)
    let addArr=JSON.parse(JSON.stringify(this.state.board));
    if(addArr[idName[0]][idName[1]][0]===0){addArr[idName[0]][idName[1]][0]=1;addArr[idName[0]][idName[1]][1]='new';}
    else if(addArr[idName[0]][idName[1]][0]===1){addArr[idName[0]][idName[1]][0]=0;addArr[idName[0]][idName[1]][1]='killed';}
    //console.log(addArr)
    //addArr[idName[0]][idName[1]]=1;
    arr=$.extend(true, [], addArr);
    //$(e.target).attr('class', 'live');
    this.setState({board: arr})
  };

    handleStop = () => {
    clearInterval(setInter);
    setInter=false;
  };

  handleResume = ()=> {
    if(!setInter){setInter=setInterval(change, speed);}  
  };

  handleClear = () => {
    this.setState({board: boardArr(row, column, 0, false)});
    clearInterval(setInter)
    setInter=false;
    gen=0;

  };

  handleBig = () => {
    row=40, column=60, gen=0;  
    this.setState({board: boardArr(row, column, 0, true)});
   set1();
  };

  handleBack = () => {
    row=25, column=40, gen=0;
    console.log(this.state.board)
    this.setState({board: boardArr(row, column, 0, true)});
    console.log(this.state.board)
    set1();
  };

  handleNext = () => {
    this.handleStop();
    change();
  };

  render () {
    return (
      <div>
        <div className='maintitle'>Game of Life</div>  
      <div className='but'>
      <button className="btn btn-success" onClick={this.handleResume}>Run</button>
      <button className="btn btn-warning" onClick={this.handleStop}>Pause</button>
      <button className="btn btn-info" onClick={this.handleNext}>Next</button>
      <button className="btn btn-danger" onClick={this.handleClear}>Clear</button>
      <button className="btn btn-primary" onClick={this.handleRandom}>Random</button>
      <button className="btn btn-secondary" onClick={this.handleBack}>Size: 25X40</button>
      <button className="btn btn-secondary" onClick={this.handleBig}>Size: 40X60</button> 
      </div>
      <h3 className='Generation'>Generation:&nbsp;{gen}</h3>          
      <table>
      <tbody>
      {this.tableMaker()}
      </tbody>
      </table>
      </div> 
    )
  }
}

ReactDOM.render(<Game />,
  document.getElementById('app'));

