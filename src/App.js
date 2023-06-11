import "./App.css";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchUsers } from './actions/userActions';
import { Table, Input, Select, Spin } from 'antd';

function App(props) {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loadingButton, setloadingButton] = useState(true);

  useEffect(() => {
    if (users.length) setloadingButton(false)
  }, [])

  const handleChangeSearchTerm = e => {
    setSearchTerm(e.target.value);
  };


  const handleChangeGenderFilter = e => {
    setGenderFilter(e);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setGenderFilter('all');
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // const filteredUsers = users.filter(user => {
  //   const name = user?.name.toLowerCase();
  //   const username = user?.username.toLowerCase();
  //   const searchTermLower = searchTerm.toLowerCase();
  //   const gender = user?.gender.toLowerCase();
  //   return (
  //     (name.includes(searchTermLower) || username.includes(searchTermLower)) &&
  //     (genderFilter === 'all' || genderFilter === gender)
  //   );
  // });

  const filterForMe = users.filter(user => {
    const name = user?.name.toLowerCase();
    const username = user?.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    // const gender = user?.gender.toLowerCase();
    return (name.includes(searchTermLower) || username.includes(searchTermLower))
    // &&
    //   (genderFilter === 'all' || genderFilter === gender)
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

  const updateInputBox = e => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="App">
      <div className="contain">
        {
          loadingButton ?
            <div>
              <>
                <div className="filter-box">
                  <div>
                    <Input type="text"
                      style={{ height: '3rem' }}
                      value={searchTerm} onChange={updateInputBox} />
                  </div>
                  {/* <div>
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChangeGenderFilter}
                  options={[
                    {
                      value: 'all',
                      label: 'All',
                    },
                    {
                      value: 'male',
                      label: 'Male',
                    },
                    {
                      value: 'female',
                      label: 'Female',
                    }
                  ]}
                />
              </div> */}
                  <div>
                    <button
                      onClick={() => handleClearFilters()}
                    >Clear Input Field</button>
                  </div>
                </div>
                <div className="table-data">
                  <Table dataSource={dataSource} columns={columns} />;
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
