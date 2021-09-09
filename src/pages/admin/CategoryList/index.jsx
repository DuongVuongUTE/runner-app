import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Button,
  Input,
  Space,
  Popconfirm,
} from "antd";

import * as Icon from "@ant-design/icons";

import ModifyCategoryModal from './components/ModifyCategoryModal';

import {
  getCategoryListAction,
  createCategoryAction,
  editCategoryAction,
  deleteCategoryAction,
} from '../../../redux/actions';

import * as Style from './styles'

function CategoryListPage(props) {
  
  const [searchKey, setSearchKey] = useState('');
  const [isShowModifyModal, setIsShowModifyModal] = useState('');
  const [modifyCategoryData, setModifyCategoryData] = useState({});

  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  function handleSearchCategory(value) {
    console.log("🚀 ~ file: index.jsx ~ line 31 ~ handleSearchCategory ~ value", value)
    setSearchKey(value);
    dispatch(getCategoryListAction({
      searchKey:value
    }));
  }
  function handleSubmitForm(values) {
    if (isShowModifyModal === 'create') {
      dispatch(createCategoryAction({
        data: values
      }));
    } else {
      dispatch(editCategoryAction({
        id: modifyCategoryData.id,
        data: values,
      }));
    }
    setIsShowModifyModal('');
  }

  const tableColumn = [
    {
      title: 'loại',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setIsShowModifyModal('edit');
                setModifyCategoryData(record);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => dispatch(deleteCategoryAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = categoryList.data.map((categoryItem, categoryIndex) => {
    return {
      key: categoryIndex,
      ...categoryItem,
    }
  })

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Style.Title>Quản lý loại sản phẩm</Style.Title>
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal('create');
              setModifyCategoryData({ name: '', price: 0 });
            }}
          >
            Thêm mới
          </Button>
        </Row>
        <Style.Search>
          <Input 
            style={{width:"50%"}} placeholder="Tìm kiếm..." 
            suffix={<Icon.SearchOutlined />} 
            onChange={(e)=>handleSearchCategory(e.target.value)}
            />
        </Style.Search>
        <Style.CustomTable
          columns={tableColumn}
          dataSource={tableData}
          loading={categoryList.load}
        />
      </div>
      <ModifyCategoryModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyCategoryData={modifyCategoryData}
      />
    </div>
  );
}

export default CategoryListPage;
