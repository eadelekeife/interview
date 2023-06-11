import "./App.css";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchUsers } from './actions/userActions';
import { Table, Input, Select, Spin, notification } from 'antd';

function App(props) {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const [searchTerm, setSearchTerm] = useState('');
  const [emailFilter, setEmailFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loadingButton, setloadingButton] = useState(true);
  const [emailExtensions, setEmailExtensions] = useState(['all']);

  const openNotificationIcon = () => {
    notification.open({
      description:
        'An error occurred while fetching data. Please try again'
    });
  };


  useEffect(() => {
    if (users.length) setloadingButton(false)
    if (error) openNotificationIcon()
    let extensionArray = [];
    users.map(emailAddresses => {
      let emailExtentsion = emailAddresses.email.slice(emailAddresses.email.lastIndexOf('.'));
      if (!extensionArray.includes(emailExtentsion)) extensionArray.push(emailExtentsion);
    })
    setEmailExtensions([...emailExtensions, ...extensionArray])
  }, [users.length])

  const handleChangeemailFilter = e => {
    setEmailFilter(e);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setEmailFilter('all');
    setCurrentPage(1);
  };

  const updateSearchTerm = e => {
    setSearchTerm(e.target.value)
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filterForMe = users.filter(user => {
    const name = user?.name.toLowerCase();
    const username = user?.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const email = user?.email.toLowerCase();
    if (emailFilter === "all") {
      return name.includes(searchTermLower) || username.includes(searchTermLower)
    } else {
      return (name.includes(searchTermLower) || username.includes(searchTermLower)) && email.includes(`${emailFilter}`)
    }
  })

  // const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // const renderTableHeader = () => {
  //   return (
  //     <thead>
  //       <tr>
  //         <th>Name</th>
  //         <th>Username</th>
  //         <th>Email</th>
  //         <th>Phone</th>
  //         <th>Website</th>
  //       </tr>
  //     </thead>
  //   );
  // };

  // const renderTableBody = () => {
  //   return (
  //     <tbody>
  //       {currentUsers.map(user => (
  //         <tr key={user.id}>
  //           <td>{user.name}</td>
  //           <td>{user.username}</td>
  //           <td>{user.email}</td>
  //           <td>{user.phone}</td>
  //           <td>{user.website}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   );
  // };

  // const renderPagination = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
  //     pageNumbers.push(i);
  //   }
  //   return (
  //     <ul className="pagination">
  //       {pageNumbers.map(number => (
  //         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
  //           <button className="page-link" onClick={() => setCurrentPage(number)}>
  //             {number}
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
  ];
  const dataSource = filterForMe.map((user, index) => {
    return {
      key: index,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
    }
  })

  return (
    <div className="App">
      <div className="contain">
        {
          !loadingButton ?
            <div>
              <>
                <div className="filter-box">
                  <div>
                    <label htmlFor="searchName">Name / Email</label>
                    <Input type="text" id="searchName"
                      style={{ height: '3rem', width: 200 }}
                      value={searchTerm} onChange={updateSearchTerm} />
                  </div>
                  <div>
                    <label htmlFor="searchEmail">Email extension</label>
                    <Select htmlFor="searchEmail"
                      defaultValue={emailFilter}
                      style={{
                        width: 200,
                        height: '3rem'
                      }}
                      onChange={handleChangeemailFilter}>
                      {emailExtensions.map((ext, index) => {
                        return <Select.Option value={ext} key={index}>{ext}</Select.Option>
                      })}
                    </Select>
                  </div>
                  <div>
                    <label style={{ visibility: 'hidden' }} htmlFor="searchEmail">Email extension</label>
                    <button
                      onClick={() => handleClearFilters()}
                    >Clear Input Field</button>
                  </div>
                </div>
                <div className="table-data">
                  <Table dataSource={dataSource} columns={columns} />
                </div>
              </>
            </div>
            :
            <div>
              <Spin />
            </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = store => {
  return { appData: store }
}
export default connect(mapStateToProps)(App);
