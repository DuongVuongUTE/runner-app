import { render } from '@testing-library/react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Row, Card, Space, Input, Button, InputNumber, Tag, Radio, Upload, Checkbox, Select } from 'antd';
import * as Icon from "@ant-design/icons";

import {
  setProductSelectActionAdmin,
  getCategoryListAction,
  getProductListActionAdmin,
  createProductActionAdmin,
  editProductActionAdmin,
  createOptionActionAdmin
} from '../../../redux/actions'

import ProductOptionItem from '../components/ProductOptuonItem';

import * as Style from './styles'
import history from '../../../utils/history';

const COLOR_MENU = [
  '#e7352b',
  '#ffffff',
  '#000000',
  '#1790c8',
  '#f36b26',
  '#825d41',
  '#7bba3c',
  '#fed533',
  '#808080',
  '#f0728f',
  '#02cbb5',
  'multicolor'
]


function ModifyProduct({ action, match }) {
  const productId = match.params?.id
  const { Option } = Select;
  const [productForm] = Form.useForm();

  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productList } = useSelector((state) => state.productReducerAdmin);
  const { productSelected } = useSelector((state) => state.commonProductReducerAdmin);

  const [isOptionForm, setIsOptionForm] = useState(false);
  const [isShowCreateOption, setIsShowCreateOption] = useState(false);

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListActionAdmin());
    productForm.resetFields();
  }, [])
  useEffect(() => {
    if(productList.data.length>0){
      productForm.resetFields();
    }
   
  }, [productList.data])
  const setInitialValues = action === "create"
    ? {}
    : productList.data.find((ProductItem) => {
      return ProductItem.id == productId
    })
  function renderProductOptionItems() {
    return productSelected.productOptions.map((optionItem, optionIndex) => {
      return (
        <ProductOptionItem
          key={optionIndex}
          optionItem={optionItem}
          productId={productSelected.id}
        />
      )
    })
  }
  function renderCreateOptionForm() {
    return (
      <Card size="small" title="Thêm mới">
        <Form
          name="createProductOption"
          onFinish={(values) => {
            console.log('🚀 ~ file: index.jsx ~ line 187 ~ renderCreateOptionForm ~ values', values);
            dispatch(createOptionActionAdmin(
              {
                data:{
                  ...values,
                  productId:parseInt(productId)
                }
              }
            ));
            setIsShowCreateOption(false);
          }}
        >
          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: 'Bạn chưa điền tên của tùy chọn' }]}
          >
            <Input placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Bạn chưa điền giá của tùy chọn' }]}
          >
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá thêm"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsShowCreateOption(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Thêm</Button>
            </Space>
          </Row>
        </Form>
      </Card>
    )
  }
  function renderProductOptionForm() {
    return (
      <div style={{ marginTop: 16 }}>
        <h4>Danh sách tùy chọn</h4>
        {
          productSelected.id &&
          productSelected.productOptions.length > 0 &&
          renderProductOptionItems()
        }
        {isShowCreateOption
          ? renderCreateOptionForm()
          : (
            <Button
              type="dashed"
              block
              icon={<Icon.PlusOutlined />}
              onClick={() => setIsShowCreateOption(true)}
            >
              Thên tùy chọn
            </Button>
          )
        }
      </div>
    )
  }

  // console.log("🚀 ~ file: index.jsx ~ line 49 ~ handleSetInitialValues ~ handleSetInitialValues", handleSetInitialValues())
 

  function handleSubmitForm() {
    const values = productForm.getFieldsValue();
    if (action === "create") {
      dispatch(createProductActionAdmin(
        {
          data: {
            ...values,
            // 'images': values.images.map((item) => item.name)
          }
        }
      ));
    }
    else{
      dispatch(editProductActionAdmin(
        {
          id:productId ,
          data: {
            ...values,
            'images': values.images.map((item) => item.name)
          }
        }
      ));
    }
    history.push('/admin/products');
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    };
    return e && e.fileList;
  };

  function renderOptionCategory() {
    return categoryList.data.map((categoryItem) => {
      return (
        <>
          <Option value={categoryItem.id}>
            {categoryItem.name}
          </Option>
        </>
      )
    })
  }
  function renderOptionColor() {
    return COLOR_MENU.map((colorItem, colorIndex) => {
      return (
        <Style.customRadio value={colorItem}>
          {colorItem == "#ffffff" || colorItem == "multicolor"
            ? <Tag >{colorItem}</Tag>
            : <Tag color={colorItem}>{colorItem}</Tag>
          }

        </Style.customRadio>
      )

    })
  }
  return (
    <>
      <Style.Container>
        <h3>{action} Product</h3>
        <div>
          <Form
            form={productForm}
            className="form"
            name="basic"
            labelCol={{ span: 4 }}
            initialValues={setInitialValues}
            onFinish={handleSubmitForm}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your userdescription!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: 'Please input your Category!' }]}
            >
              <Select>
                {renderOptionCategory()}
              </Select>
            </Form.Item>
            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: 'Please input your color!' }]}
            >
              <Radio.Group>
                {renderOptionColor()}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="images"
              label="Images"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" listType="picture">
                <Button icon={<Icon.UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Tùy chọn">
              <Checkbox disabled={action === "create"}
                checked={isOptionForm} onChange={(e) => setIsOptionForm(e.target.checked)}
              />
            </Form.Item>
          </Form>
          {isOptionForm && productSelected.id && renderProductOptionForm()}
          <Row justify="end">
            <Space style={{ marginTop: "40px" }}>
              <Button>Hủy</Button>
              <Button type="primary" onClick={() => handleSubmitForm()}>Lưu</Button>
            </Space>
          </Row>
        </div>
      </Style.Container >
    </>
  )
}
export default ModifyProduct