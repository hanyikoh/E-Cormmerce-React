import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, deleteProductStart, fetchProductsStart } from './../../redux/Products/productsActions'
import { firestore } from './../../firebase/utils';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import './styles.scss';
import LoadMore from '../../components/LoadMore';

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const Admin = props => {
    const { products } = useSelector(mapState)
    const dispatch = useDispatch()
    // const [products, setProducts] = useState([]);
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const { data, queryDoc, isLastPage } = products;

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    useEffect(() => {
        // firestore.collection('products').get().then(snapshot => {
        //     const snapshotData = snapshot.docs.map(doc => doc.data());
        //     setProducts(snapshotData);
        // });
        dispatch(fetchProductsStart())
    }, []);

    const resetForm = () => (
        setHideModal(true),
        setProductCategory('mens'),
        setProductName(''),
        setProductThumbnail(''),
        setProductPrice(0)
    )


    const handleSubmit = e => {
        e.preventDefault();

        // firestore.collection('products').doc().set({
        //     productCategory,
        //     productName,
        //     productThumbnail,
        //     productPrice
        // }).then(e => {
        //     // Success
        // });
        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        )

        resetForm();
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        )
    }

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    }

    return (
        <div className="admin">

            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                            Add new product
                        </h2>

                        <FormSelect
                            label="Category"
                            options={[{
                                value: "mens",
                                name: "Mens"
                            }, {
                                value: "womens",
                                name: "Womens"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <FormInput
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <FormInput
                            label="Main image URL"
                            type="url"
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <FormInput
                            label="Price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button type="submit">
                            Add product
                        </Button>

                    </form>
                </div>
            </Modal>

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>
                                    Manage Product
                            </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                            const {
                                                productName,
                                                productThumbnail,
                                                productPrize,
                                                documentID
                                            } = product

                                            return (
                                                <tr>
                                                    <td>
                                                        <img className="product-thumbnail" src={productThumbnail} alt="" />
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        RM {productPrize}
                                                    </td>
                                                    <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                        DELETE
                                                            </Button>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                {isLastPage && (
                                                <LoadMore {...configLoadMore} />
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        </div >
    );
}


export default Admin;