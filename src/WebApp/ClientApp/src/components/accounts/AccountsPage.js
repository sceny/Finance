import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from '@reach/router';
import { loadAccounts } from '../../store/account';
import { loadInstitutions } from '../../store/institution';
import AccountList from './AccountList';

function AccountsPage({
  accounts,
  institutions,
  loadAccounts,
  loadInstitutions
}) {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (accounts.length === 0) {
      loadAccounts().catch(error => {
        alert('Loading accounts failed' + error);
      });
    }

    if (institutions.length === 0) {
      loadInstitutions().catch(error => {
        alert('Loading institutions failed' + error);
      });
    }
  }, [accounts, institutions, loadAccounts, loadInstitutions]);

  return (
    <>
      {redirectToAddCoursePage && <Redirect to='/account' />}
      <button
        style={{ marginBottom: 20 }}
        className='btn btn-primary add-course'
        onClick={() => setRedirectToAddCoursePage(true)}>
        Add Account
      </button>
      <h2>Accounts</h2>
      <AccountList accounts={accounts} />
    </>
  );
}

AccountsPage.propTypes = {
  institutions: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  loadAccounts: PropTypes.func.isRequired,
  loadInstitutions: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    accounts:
      state.institutions.length === 0
        ? []
        : state.accounts.map(account => {
            return {
              ...account,
              institutionName: state.institutions.find(
                a => a.id === account.institutionId
              ).name
            };
          }),
    institutions: state.institutions
  };
}

const mapDispatchToProps = {
  loadAccounts,
  loadInstitutions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsPage);
