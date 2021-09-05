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
  Col,
  Image,
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
  getProductDetailActionAdmin,
  getDepartmentListAction
} from '../../../redux/actions'
import { convertFileToBase64 } from '../../../utils/common'
import ProductOptionItem from '../components/ProductOptionItem';

import history from '../../../utils/history';
import * as Style from './styles'

const COLOR_MENU = [
  {
    'name':'đỏ',
    'code':'#e7352b'
  },
  {
    'name':'trắng',
    'code':'#ffffff',
  },
  {
    'name':'đen',
    'code':'#000000',
  },
  {
    'name':'xanh dương',
    'code':'#1790c8',
  },
  {
    'name':'cam',
    'code':'#f36b26',
  },
  {
    'name':'nâu',
    'code':'#825d41',
  },
  {
    'name':'xanh la',
    'code':'#7bba3c',
  },
  {
    'name':'vàng',
    'code':'#fed533',
  },
  {
    'name':'xám',
    'code':'#808080',
  },
  {
    'name':'hồng',
    'code':'#f0728f',
  },
  {
    'name':'xanh ngọc',
    'code':'#02cbb5',
  },
  {
    'name':'màu khác',
    'code':'multicolor',
  },
]


function ModifyProduct({ action, match }) {

  const [uploadImages, setUploadImage] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const productId = match.params?.id
  const { Option } = Select;
  const [productForm] = Form.useForm();

  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productDetail } = useSelector((state) => state.productReducerAdmin);
  const { departmentList } = useSelector((state) => state.departmentReducer);
  const { productSelected } = useSelector((state) => state.commonProductReducerAdmin);
  
  const [isOptionForm, setIsOptionForm] = useState(false);
  const [isShowCreateOption, setIsShowCreateOption] = useState(false);
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getDepartmentListAction());
  }, [])
  useEffect(() => {
    if (productId) {
      dispatch(getProductDetailActionAdmin({ id: productId }));
    }
  }, [productId]);
  useEffect(() => {
    if (productDetail.data.id) {
      productForm.resetFields();
      setUploadImage([...productDetail.data.images]);
      dispatch(setProductSelectActionAdmin(
        productDetail.data
      ));
    }
  }, [productDetail.data])

  async function handleUploadImage(value) {
    if (!["image/png", "image/jpeg"].includes(value.file.type)) {
      return setUploadError('File không đúng!');
    }
    if (value.file.size > 1024000) {
      return setUploadError('File quá nặng!');
    }
    setUploadError('');
    const imageBase64 = await convertFileToBase64(value.file);
    await setUploadImage([...uploadImages, imageBase64]);
  }

  function renderProductImages() {
    return uploadImages.map((imageItem, imageIndex) => (
      <Col span={6}>
        <Image width="100%" src={imageItem} />
      </Col>
    ));
  }

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
            label="Giá: "
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
    console.log("🚀 ~ file: index.jsx ~ line 233 ~ handleSubmitForm ~ values", {...values,images: uploadImages,})
    if (action === "create") {
      dispatch(createProductActionAdmin(
        {
          data: {
            ...values,
            images: uploadImages,
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
            images: uploadImages,
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
  function renderOptionDepartment() {
    return departmentList.data.map((departmentItem) => {
      return (
        <>
          <Option value={departmentItem.id}>
            {departmentItem.name}
          </Option>
        </>
      )
    })
  }
  function renderOptionColor() {
    // console.log("🚀 ~ file: index.jsx ~ line 287 ~ renderOptionColor ~ value", value);
    return COLOR_MENU.map((colorItem, colorIndex) => {
      return (
        <Style.customRadio value={colorItem} >
          {colorItem.code == "#ffffff" || colorItem.code == "multicolor"
            ? <Style.customTag >{colorItem.name}</Style.customTag>
            : <Style.customTag color={colorItem.code}>{colorItem.name}</Style.customTag>
          }

        </Style.customRadio>
      )

    })
  }
  return (
    <>
      <Style.Container>
        <Style.Title>{action=="create"?"Thêm":"Sửa"} Sản Phẩm</Style.Title>
        <div>
          <Form
            form={productForm}
            className="form"
            name="basic"
            labelCol={{ span: 6 }}
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
              label="Đối tượng sử dụng:"
              name="departmentId"
              rules={[{ required: true, message: 'Bạn chưa chọn đối tượng sử dụng' }]}
            >
              <Select>
                {renderOptionDepartment()}
              </Select>
            </Form.Item>
            <Form.Item
              label="Màu sắc"
              name="color"
              rules={[{ required: true, message: 'bạn chưa chọn màu' }]}
            >
              <Radio.Group >
                {renderOptionColor()}
              </Radio.Group>
            </Form.Item>
            <Row>
            <Col span={4} style={{ textAlign: "right" }}>
              <Space style={{ marginTop: 4 }} size={0}>
                <div
                  style={{
                    display: 'inline-block',
                    marginRight: '4px',
                    color: '#ff4d4f',
                    fontSize: '14px',
                    fontFamily: 'SimSun, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  *
                </div>
                <div style={{ marginRight: 8 }}>Hình ảnh :</div>
              </Space>
            </Col>
            <Col span={20}>
              <Upload
                accept="image/*"
                listType="picture"
                beforeUpload={() => false}
                onChange={(value) => handleUploadImage(value)}
                showUploadList={false}
              >
                <Button icon={<Icon.UploadOutlined />}>Click to upload</Button>
              </Upload>
              {uploadImages.length > 0 && (
                <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                  {renderProductImages()}
                </Row>
              )}
              <div style={{ height: 24, color: '#ff4d4f' }}>
                {uploadError}
              </div>
            </Col>
          </Row>
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