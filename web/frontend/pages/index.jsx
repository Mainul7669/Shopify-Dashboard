import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBell, FaBoxOpen,  FaSearch, FaShopify, FaTruckMoving, FaWallet } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';



import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  OptionList,
  Button,
  Popover,
} from '@shopify/polaris';



export default function HomePage() {
  const colors = ['#add8e6', '#87ceeb', '#ffc0cb', '#3eb0f7'];

  const [cardsData] = useState([
    { icon: <FaWallet />, value: 10000, subtitle: 'Revenue' },
    { icon: <BsFillPeopleFill />, value: 1500, subtitle: 'Customers' },
    { icon: <FaBoxOpen />, value: 103, subtitle: 'Products' },
    { icon: <FaTruckMoving />, value: 500, subtitle: 'Orders' },
  ]);

  const [chartData] = useState([
    { name: 'Pizza', uv: 1800, pv: 2400, amt: 2400 },
    { name: 'Salad', uv: 1500, pv: 1398, amt: 2210 },
    { name: 'Desert', uv: 1790, pv: 3800, amt: 2500 },
    { name: 'Drinks', uv: 2490, pv: 4300, amt: 2100 },
  ]);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };



  const orders = [
    {
      id: '1020',
      order: '#1020',
      date: 'Jul 21 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="complete">Completed</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 10 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 30 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="incomplete">Pending</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 25 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="complete">Completed</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 15 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="complete">Completed</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{total}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );


  const ranges = [

    {
      title: "Today",
      alias: "today",
      period: {
        since: "today",
        until: "today",
      },
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: "yesterday",
        until: "yesterday",
      },
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: "-7d",
        until: "-1d",
      },
    },
  ];
  const [selected, setSelected] = useState(ranges[0]);
  const [popoverActive, setPopoverActive] = useState(false);

  return (
    <div>
      <header>
        <Navbar collapseOnSelect expand="lg" className="fw-bold" style={{ backgroundColor: '#dbf0f9' }}>
          <Container>
            <Navbar.Brand href="#">
              <img style={{ width: '25px', height: '25px' }} src="https://cdn-icons-png.flaticon.com/512/2635/2635170.png" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#">Dashboard</Nav.Link>
                <Nav.Link href="#">Journeys</Nav.Link>
                <Nav.Link href="#">Analytics</Nav.Link>
                <Nav.Link href="#">Subscribers</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#">
                  <FaSearch />
                </Nav.Link>
                <Nav.Link href="#">
                  <FaShopify />
                </Nav.Link>
                <Nav.Link href="#">
                  <FaBell />
                </Nav.Link>
                <Nav.Link href="#">
                  <img className="rounded-4" style={{ width: '20px', height: '20px' }} src="https://assets.paperjam.lu/images/articles/delano_gov-gives-eu5000-grants-3300-smes-self-employed/0.5/0.5/600/400/201904021342_delles_lex1_0.jpg" alt="" />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <section>
        <div className="row gap-3 m-4">
          {cardsData.map((card, index) => (
            <Card className="border border-none" style={{ width: '18rem' }} key={index}>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <Card.Title>
                    <span>{card.icon}</span>
                  </Card.Title>
                  <div>
                    <Card.Title>{card.value}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{card.subtitle}</Card.Subtitle>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="m-4" style={{ width: '32rem' }}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </Card>
      </section>


<section>
<div className='m-4'>
<LegacyCard>

<div className='m-3'>
<Popover 
      autofocusTarget="none"
      preferredAlignment="left"
      preferInputActivator={false}
      preferredPosition="below"
      activator={
        <Button
          onClick={() => setPopoverActive(!popoverActive)}
          
        >
          {selected.title}
        </Button>
      }
      active={popoverActive}
    >
      <OptionList
        options={ranges.map((range) => ({
          value: range.alias,
          label: range.title,
        }))}
        selected={selected.alias}
        onChange={(value) => {
          setSelected(ranges.find((range) => range.alias === value[0]));
          setPopoverActive(false);
        }}
      />
    </Popover>

</div>

<div className='mt-3'>
<IndexTable 
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Order'},
          {title: 'Date'},
          {title: 'Customer'},
          {title: 'Total', },
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
</div>

    </LegacyCard>

</div>

</section>



    </div>
  );
}

