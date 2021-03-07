import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''
    });


    const handleOnChange = (event: FormEvent ) => {
        const name = event.target.name;
        const value = event.target.value;
        
        console.log({ name, value });
        setFormData (data => ({...data, [name]: value}));
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl:'https://images-americanas.b2w.io/produtos/01/00/img/87867/6/87867607_1GG.jpg',
            categories: [{id: formData.category}]
        }
        
        makeRequest({url: '/products', method: 'POST', data: payload})
        .then(()=> {
            setFormData({name:'', category: '', price: '', description: ''});
        })
    }

    return (
        <form onSubmit={handleSubmit}>
        <BaseForm title="cadastrar um produto">
           
            <div className="row">
                <div className="col-6">
                <input 
                    value={formData.name}
                    name="name"
                    type="text" 
                    className="form-control mb-5" 
                    onChange={handleOnChange}
                    placeholder="Nome do Produto"
                    />

            <select 
                value={formData.category}
                className="form-control mb-5" 
                onChange={handleOnChange}
                name="category"
                >
                <option value="1">Livros</option>
                <option value="3">Computadores</option>
                <option value="2">Eletronicos</option>
            </select>

            <input 
                    value={formData.price}
                    name="price"
                    type="text" 
                    className="form-control" 
                    onChange={handleOnChange}
                    placeholder="Preço do Produto"
                    /> 
            </div>

            <div className="col-6">
            <textarea 
                onChange={handleOnChange}
                value={formData.description}
                name="description" 
                className="form-control"
                cols={30} 
                rows={10} 
                />
            </div>    
            </div>
        </BaseForm>
        </form>
    )
}

export default Form;