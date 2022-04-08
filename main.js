const btnCriaTabela = document.getElementById("btnCriaTabela");
const container = document.querySelector(".container");
let buttonsList =null; 
let inputs = null;

btnCriaTabela.addEventListener("click",()=>montaTela(),true);

const thead =
`
<thead>
<tr>
 <td>Nome</td>
 <td>Registro Academico</td>  
</tr>
</thead>
`


const Tabela =
`
    <table>
        ${thead}
     <tbody>
      <tr>
       <td>José</td>
       <td>A0001</td>
      </tr>
      <tr>
       <td>Maria</td>
       <td>A0002</td>
      </tr>
      <tr>
       <td>Daniela</td>
       <td>A0003</td>
      </tr>
     </tbody>
    </table>
    `

const Inputs =
`
    <div class="inputsContainer">
     <input type="text" placeholder="Nome">
     <input type="text" placeholder="Registro Academico" >
    </div>

 `

 const Buttons =
 `
  <div class="buttonsContainer">
    <button>Começo da tabela</button>
    <button>Fim da tabela</button>
  </div>
 `

function montaTela(tabela=Tabela)
{
    container.innerHTML="";
    container.innerHTML += tabela + Inputs + Buttons;
        
    addEventosButtons()
}

function addEventosButtons()
{
    buttonsList= document.querySelectorAll(".buttonsContainer > button");    
    inputs= document.querySelectorAll(".inputsContainer > input");

    inputs[1].addEventListener("keydown",(e)=>validaCampo(e.target),true);
    buttonsList[0].addEventListener("click",()=>criaTabelaAlterada('comeco'),true);
    buttonsList[1].addEventListener("click",()=>criaTabelaAlterada('fim'),true);

}

const validaCampo = (e) => e.value.length<=4?"":e.value="";

function pegaValoresTabela()
{
 const tbody = document.querySelectorAll(".container table tbody tr td");
 const valoresTbody =[];

  for(let i = 0 ; i< tbody.length;i+=2)
  {
   
    valoresTbody.push(  
    `
    <tr>
      <td>${tbody[i].textContent}</td>
      <td>${  tbody[i+1].textContent}</td>
    <tr>
    `
    )

  }
 const novoTbody = valoresTbody.reduce((tr,acc)=>tr+acc);
 return novoTbody
}

function criaTabelaAlterada(posicao)
{
    const novoTbody = pegaValoresTabela()
    const inputNome =inputs[0].value;
    const inputRegistroAcademico =inputs[1].value;
    
     const novaTr = 
     `
       <tr>
         <td>${inputNome}</td>
         <td>${inputRegistroAcademico}</td>
       </tr>
     `

   const novaTabela=
   `
   <table>
    ${thead}
     <tbody>
     ${posicao === 'comeco'?novaTr:""}
     ${novoTbody}      
     ${posicao === 'fim'?novaTr:""}
     </tbody>
     
   <table>
   `
   montaTela(novaTabela)
}