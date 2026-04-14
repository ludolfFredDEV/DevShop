import { createContext, useState, useContext, useEffect } from "react";

//criação do espaço do contexto
const CartContext = createContext()

//Criação do Provedor que vai evolver o app e distribuir os dados 
export function CartProvider({ children }) {
    //Ao iniciar tenta buscar o que já existe no cache do navegador
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('devshop_cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    //Toda vez que houver mudança no carrinho ele salva uma nova versão no localstorage
    useEffect(() => {
        localStorage.setItem('devshop_cart',JSON.stringify(cart))
    }, [cart])

    //Função para adicionar ao carrinho
    function addToCart(product) {
        console.log("Tentando adicionar:", product);
        setCart(prevCart => {
            console.log("Estado anterior do carrinho:", prevCart);
            //verifica se o produto já está no carrinho
            const itemExists = prevCart.find(item => item.id === product.id)

            if (itemExists) {
                //se existir aumenta a quantidade dele
                return prevCart.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: (item.quantity || 1) + 1 } 
                    : item
                )
            }
            //Se não existir adiciona quantidade 1 
            return [...prevCart, { ...product, quantity: 1 }];
        })
    }

    function updateQuantity(productId, amount) {
        setCart(prevCart => {
            return prevCart.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + amount;
                // Não deixa a quantidade ser menor que 1
                return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
            }
            return item;
            });
        });
    }


    // Remove um item pelo index (evita remover todos se tiverem o mesmo ID)
    function removeFromCart(index) {
        const newCart = [...cart]
        newCart.splice(index, 1)
        setCart(newCart)
    }

    //calculando quantidade total de itens 
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, setCart }}>
            {children}
        </CartContext.Provider>
    )   
}

// Criação de Hook para facilitar o uso depois 
export function useCart() {
  return useContext(CartContext);
}