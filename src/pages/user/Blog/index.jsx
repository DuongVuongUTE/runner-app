import React from "react";
import BreadcrumbUI from "../../../components/Breadcrumb";
import { List, Avatar, Space } from "antd";
import * as Icons from "@ant-design/icons";
import * as Style from "./styles";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://animevietsub.tv/phim/tantei-wa-mou-shindeiru-a4140/",
    title: `Bài viết số ${i + 1}`,
    avatar:
      "https://i.pinimg.com/236x/ee/84/1f/ee841f68c56f2082c77d2b0995e2ad11.jpg",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, quasi. Quasi omnis doloribus facere nam provident vitae magnam placeat vero ipsam. Numquam iste ipsum optio ab placeat maiores repellat eos?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, consectetur voluptatum reprehenderit doloremque blanditiis obcaecati officia voluptas corporis dignissimos totam placeat quod velit fuga commodi eveniet, enim doloribus quaerat maiores?",
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function BlogPage() {
  return (
    <Style.BlogPage>
      <Style.Hero src="">
        <Style.Breadcrumb>
          <BreadcrumbUI />
        </Style.Breadcrumb>

        <Style.HeroTitle>Bài viết</Style.HeroTitle>
      </Style.Hero>
      <Style.BlogContainer>
        <List
          style={{ marginBottom: 30 }}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={Icons.StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={Icons.LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={Icons.MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://static.zerochan.net/Siesta.%28Tantei.wa.Mou.Shindeiru%29.full.3342425.jpg"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Style.BlogContainer>
    </Style.BlogPage>
  );
}

export default BlogPage;
