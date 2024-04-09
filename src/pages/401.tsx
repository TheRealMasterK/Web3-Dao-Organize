import Layout from "@/components/layouts/layout-screen";

const UnauthorizedPage = () => {
  return (
    <Layout>
      <div className="unauthorized-page-container">
        <h1 className="unauthorized-page-heading">You are unauthorized!</h1>
        <h3 className="unauthorized-page-sub-heading">
          The owner of this board has set its permissions to private.
        </h3>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;
