import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
  Form,
  Row,
  Card,
  Space,
  Input,
  Button,
  InputNumber,
  Tag,
  Radio,
  Upload,
  Checkbox,
  Select } from 'antd';
import * as Icon from "@ant-design/icons";

import {
  setProductSelectActionAdmin,
  getCategoryListAction,
  getProductListActionAdmin,
  createProductActionAdmin,
  editProductActionAdmin,
  createOptionActionAdmin,
  getProductDetailActionAdmin
} from '../../../redux/actions'

import ProductOptionItem from '../components/ProductOptionItem';

import history from '../../../utils/history';
import * as Style from './styles'

const COLOR_MENU = [
  {
    'color':'đỏ',
    'code':'#e7352b'
  },
  {
    'color':'trắng',
    'code':'#ffffff',
  },
  {
    'color':'đen',
    'code':'#000000',
  },
  {
    'color':'xanh dương',
    'code':'#1790c8',
  },
  {
    'color':'cam',
    'code':'#f36b26',
  },
  {
    'color':'nâu',
    'code':'#825d41',
  },
  {
    'color':'xanh la',
    'code':'#7bba3c',
  },
  {
    'color':'vàng',
    'code':'#fed533',
  },
  {
    'color':'xám',
    'code':'#808080',
  },
  {
    'color':'hồng',
    'code':'#f0728f',
  },
  {
    'color':'xanh ngọc',
    'code':'#02cbb5',
  },
  {
    'color':'màu khác',
    'code':'multicolor',
  },
]


function ModifyProduct({ action, match }) {
  const productId = match.params?.id
  const { Option } = Select;
  const [productForm] = Form.useForm();

  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productDetail } = useSelector((state) => state.productReducerAdmin);
  const { productSelected } = useSelector((state) => state.commonProductReducerAdmin);

  const [isOptionForm, setIsOptionForm] = useState(false);
  const [isShowCreateOption, setIsShowCreateOption] = useState(false);
  useEffect(() => {
    dispatch(getCategoryListAction());
    if(productId){
      dispatch(getProductDetailActionAdmin({
        id:productId
      }));
    }
    productForm.resetFields();
  }, [])
  useEffect(() => {
    if (productDetail.data) {
      productForm.resetFields();
      dispatch(setProductSelectActionAdmin(
        productDetail.data
      ));
    }
  }, [productDetail.data])
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
                data: {
                  ...values,
                  productId: parseInt(productId)
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
    else {
      dispatch(editProductActionAdmin(
        {
          id: productId,
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
          {colorItem.code == "#ffffff" || colorItem.code == "multicolor"
            ? <Style.customTag >{colorItem.color}</Style.customTag>
            : <Style.customTag color={colorItem.code}>{colorItem.color}</Style.customTag>
          }

        </Style.customRadio>
      )

    })
  }
  return (
    <>
      <Style.Container>
        <h3>{action=="create"?"Thêm":"Sửa"} Sản Phẩm</h3>
        <div>
          <Form
            form={productForm}
            className="form"
            name="basic"
            labelCol={{ span: 5 }}
            initialValues={productId?productDetail.data:{}}
            onFinish={handleSubmitForm}
          >
            <Form.Item
              label="Tên sản phẩm:"
              name="name"
              rules={[{ required: true, message: 'bạn chưa nhập tên sản phẩm!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Bạn chưa nhập mô tả!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'bạn chưa nhập giá!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: 'bạn chưa nhập số lượng!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Loại"
              name="categoryId"
              rules={[{ required: true, message: 'Bạn chưa chọn loại' }]}
            >
              <Select>
                {renderOptionCategory()}
              </Select>
            </Form.Item>
            <Form.Item
              label="Màu sắc"
              name="color"
              rules={[{ required: true, message: 'bạn chưa chọn màu' }]}
            >
              <Radio.Group>
                {renderOptionColor()}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="images"
              label="Hình ảnh"
              valuePropName="fileList"
              rules={[{ required: true, message: 'bạn chưa nhập hình ảnh' }]}
              getValueFromEvent={normFile}
            >
              <Upload name="logo" listType="picture">
                <Button icon={<Icon.UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form>
          <Form.Item label="Tùy chọn">
            <Checkbox disabled={action === "create"}
              checked={isOptionForm} onChange={(e) => setIsOptionForm(e.target.checked)}
            />
          </Form.Item>
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