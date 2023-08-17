class CaixaDaLanchonete {

    cardapio = [{
       codigo: 'cafe',
       descricao: 'cafe',
       valor: 3.00
   },
   {
       codigo: 'chantily',
       descricao: 'chantily',
       valor: 1.50
   },{
       codigo: 'suco',
       descricao: 'suco natural',
       valor: 6.20
   },{
       codigo: 'sanduiche',
       descricao: 'sanduíche',
       valor: 6.50
   },{
       codigo: 'queijo',
       descricao: 'queijo',
       valor: 2.00
   },{
       codigo: 'salgado',
       descricao: 'salgado',
       valor: 7.25
   },{
       codigo: 'combo1',
       descricao: '1 suco e 1 sanduíche',
       valor: 9.50
   },{
       codigo: 'combo2',
       descricao: '1 café e 1 sanduíche',
       valor: 7.50
   }]

  

   calcularValorDaCompra(metodoDePagamento, itens) {
       let resultadoVerificaMetodoDePagamento = this.verificaMetodoDePagamento(metodoDePagamento);
       let resultadoVerificaItens = this.verificaItens(itens)

       if(resultadoVerificaMetodoDePagamento == ''){
           if(resultadoVerificaItens == ''){

               let arrayAux = this.percorreEQuebraItens(itens)
               let verificaValidadeDosItens = this.verificaValidadeDosItens(arrayAux)

               if( verificaValidadeDosItens == ''){
                   let valorBruto = this.percorrerCardapioEColetaValor(arrayAux)
                   let descontosETaxas = this.descontosETaxas(valorBruto,metodoDePagamento)
                   return `R$ ${descontosETaxas.toFixed(2)}`.replace('.',',')
               }else{
                   return verificaValidadeDosItens
               }
           
           }else{
               return resultadoVerificaItens
           }
           
       }
       return resultadoVerificaMetodoDePagamento;
   }
   
   verificaMetodoDePagamento(metodoDePagamento){
       let resultado = ''
       if((metodoDePagamento != 'dinheiro' && metodoDePagamento != 'debito' && metodoDePagamento != 'credito')){
           resultado = 'Forma de pagamento inválida!'
       }
       return resultado
   }

   verificaItens(itens){
       let resultado = ''
       if(itens.length == 0){
           resultado = 'Não há itens no carrinho de compra!'
       }
       return resultado
   }

   percorreEQuebraItens(itens){
       let arrayAux = []
       for(let i = 0; i < itens.length;i++){
           let aux = itens[i].split(',')
           for(let j = 0; j < aux.length;j++){
               arrayAux.push(aux[j])
           }
       }
       
       return arrayAux
   }

   verificaValidadeDosItens(arrayAux){
       
       if(arrayAux.length % 2 != 0){
           return 'Item inválido! *'
       }else if(this.percorreArrayAuxVerificarContemItem(arrayAux) == null){
           return 'Item inválido! kkk'
       }else if(this.percorreArrayAuxVerificaValidadeItem(arrayAux)){
               return 'Quantidade inválida!'
       }else if(this.verificaItensExtras(arrayAux)){
           return 'Item extra não pode ser pedido sem o principal'
       }

       return ''
   }

   percorreArrayAuxVerificaValidadeItem(arrayAux){
       let resultado = false
       for(let i = 0; i < arrayAux.length;i++){
           if(arrayAux[i] == '0'){
               resultado = true
           }
       }
       return resultado
   }

   percorreArrayAuxVerificarContemItem(arrayAux){
       let contemItem = null
       for(let i = 0; i < arrayAux.length;i++){
           let contem = this.cardapio.find(item => item.codigo == arrayAux[i]);
           if(contem){
               contemItem = contem;
           }
       }

       return contemItem
   }

   verificaItensExtras(itens){
       let resultado = false
       if(itens.includes('chantily',0) && !itens.includes('cafe',0)){
           resultado = true  
       }

       if(itens.includes('queijo',0) && !itens.includes('salgado',0)){
           resultado = true
       }

       return resultado
   }

   percorrerCardapioEColetaValor(itens){
       let valor = 0
       for(let i = 0; i < itens.length;i+2){
           let item = this.cardapio.filter(it => it.codigo == itens[i])
           valor += item.valor
       }
       return valor
   }

   descontosETaxas (valor,metodoDePagamento){
       let valorDoDesconto = 0
       let valorFinal = 0
       if(metodoDePagamento == 'dinheiro'){
           valorDoDesconto = (5/100)*valor
           valorFinal = valor - valorDoDesconto

       }else if(metodoDePagamento == 'credito'){
           let valorAcrescimo = (3/100)*valor
           valorFinal = valor + valorAcrescimo
       }

       return valorFinal
   }

}



export { CaixaDaLanchonete };
