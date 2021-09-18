import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Space, Popconfirm, List, Input } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import moment from "moment";

import { deleteBlogAction, getBlogListAction } from "../../../redux/actions";

import * as Style from "./styles";

function BlogListPage(props) {
  const { blogList } = useSelector((state) => state.blogReducer);
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogListAction());
  }, []);

  function handleSearchBlog(value) {
    setSearchKey(value);
    dispatch(
      getBlogListAction({
        searchKey: value,
      })
    );
  }

  const tableColumn = [
    {
      dataIndex: "thumb",
      key: "thumb",
      render: (value) => <Style.ShowImage src={value}></Style.ShowImage>,
      width: 150,
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },

    {
      title: "Mô tả bài viết",
      dataIndex: "desc",
      key: "desc",
      ellipsis: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },

    {
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              ghost
              onClick={() => {
                history.push(`/admin/blog/edit/${record.id}`);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có muốn xoá bài viết này?"
              onConfirm={() => dispatch(deleteBlogAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<Icon.DeleteOutlined />} danger>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const tableData = blogList.data.map((blogItem, blogIndex) => {
    return {
      key: blogIndex,
      ...blogItem,
    };
  });

  return (
    <div>
      <div style={{ padding: 10 }}>
        <Style.CustomSpaceBox>
          <Style.Title>Quản lý bài viết</Style.Title>
          <Style.CustomSpace>
            <Style.Search>
              <Input
                style={{}}
                placeholder="Tìm kiếm..."
                suffix={<Icon.SearchOutlined />}
                value={searchKey}
                onChange={(e) => handleSearchBlog(e.target.value)}
              />
            </Style.Search>
            <Style.CustomButton
              type="primary"
              onClick={() => history.push("/admin/blog/create")}
            >
              Thêm mới
            </Style.CustomButton>
          </Style.CustomSpace>
        </Style.CustomSpaceBox>
        <Style.CustomTable
          scroll={{ y: 370, x: 2000 }}
          columns={tableColumn}
          dataSource={tableData}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <List
                  size="small"
                  dataSource={record.productOptions}
                  renderItem={(item) => (
                    <Style.ListItem>
                      <Row
                        justify="space-between"
                        style={{ width: "100%", padding: "0 60px" }}
                      >
                        <div>Size: {item.size}</div>
                        <div>
                          {(record.price + item.price).toLocaleString()}VNĐ
                        </div>
                      </Row>
                    </Style.ListItem>
                  )}
                />
              );
            },
            rowExpandable: (record) => record.productOptions?.length > 0,
          }}
          loading={blogList.load}
        />
      </div>
    </div>
  );
}

export default BlogListPage;
