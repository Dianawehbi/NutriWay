import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdAddCircle, IoMdTrash, IoMdCreate } from "react-icons/io";

export default function ManageProduct() {
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", description: "Description 1", price: "$10", quantity: 5 },
        { id: 2, name: "Product 2", description: "Description 2", price: "$20", quantity: 10 },
        { id: 3, name: "Product 3", description: "Description 3", price: "$30", quantity: 15 }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", price: "", quantity: "" });

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({ name: product.name, description: product.description, price: product.price, quantity: product.quantity });
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setFormData({ name: "", description: "", price: "", quantity: "" });
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
        } else {
            setProducts([...products, { id: Date.now(), ...formData }]);
        }
        setShowForm(false);
    };

    return (
        <div className="bg-gray-100 pt-4 min-h-screen font-serif flex flex-col">
            {/* Fixed Header */}
            <div className="fixed rounded-b-2xl bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
                <div className="flex gap-3 items-center m-2">
                    <Link to={'/Home'}>
                        <IoMdArrowRoundBack />
                    </Link>
                    <span>Admin Panel</span>
                </div>
                <div className="flex gap-3 items-center m-2 text-black">
                    <button onClick={handleAdd} className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-md">
                        <IoMdAddCircle /> {editingProduct ? "Edit Product" : "Add Product"}
                    </button>
                </div>
            </div>

            {/* Product Management Table */}
            <div className="overflow-x-auto mt-20 p-4">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Quantity</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-t">
                                <td className="py-2 px-4">{product.id}</td>
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4">{product.description}</td>
                                <td className="py-2 px-4">{product.price}</td>
                                <td className="py-2 px-4">{product.quantity}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">
                                        <IoMdCreate />
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">
                                        <IoMdTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Product Form */}
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input 
                                type="text" 
                                placeholder="Product Name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                className="border p-2 rounded" 
                                required
                            />
                            <textarea 
                                placeholder="Product Description" 
                                value={formData.description} 
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                className="border p-2 rounded"
                                required
                            />
                            <input 
                                type="text" 
                                placeholder="Product Price" 
                                value={formData.price} 
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                                className="border p-2 rounded" 
                                required
                            />
                            <input 
                                type="number" 
                                placeholder="Quantity" 
                                value={formData.quantity} 
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} 
                                className="border p-2 rounded" 
                                required
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    {editingProduct ? "Update" : "Add"}
                                </button>
                                <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}