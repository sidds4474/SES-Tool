// BULK VUEX STORE

import {
  sendbulkemail,
  sendbulkRawemail,
  sendbulksms
} from "../components/script";

//=================================
const state = {
  all: [], // stores user content
  selected: {
    title: "",
    subject: "",
    addresses: "",
    content: "",
    status: "",
    attachment: "",
    createdAt: ""
  }, // selected content to edit or send
  editedIndex: -1, // edited index
  loading: false // loader
};
const actions = {
  // retrive content
  retriveusercontent({ commit }) {
    let value;
    commit("updateall", value);
  },
  // send or edit content
  async saveandeditbulk({ commit }, value) {
    let data = state.all; //  get all user content
    // retirved saved checks
    const email_check = localStorage.getItem("@bulkemail");
    const phone_check = localStorage.getItem("@bulkphone");
    const attachment_check = localStorage.getItem("@attachment");
    if (
      JSON.parse(email_check) === true &&
      JSON.parse(attachment_check) === true
    ) {
      // send raw bulk email
      await sendbulkRawemail(value);
    } else if (
      JSON.parse(email_check) === true &&
      JSON.parse(attachment_check) !== true
    ) {
      // send bulk email
      await sendbulkemail(value);
    } else if (JSON.parse(phone_check) === true) {
      // send bulk phone number
      await sendbulksms(value);
    }

    // Once processed
    if (state.editedIndex === -1) {
      //save in your database
      data.push(value);
    } else {
      // edit
      Object.assign(data[state.editedIndex], value);
    }
    // update the table
    commit("updateall", data);
    // reset edited index
    commit("updateeditedindex", -1);
    // timeout loader
    setTimeout(() => {
      // close loader
      commit("updateloading", false);
      // clear the local storage once done
      localStorage.removeItem("@bulkemail");
      localStorage.removeItem("@bulkphone");
      localStorage.removeItem("@attachment");
    }, 1000);
  },
  // save selected
  saveselected({ commit }, value) {
    commit("updateselected", value);
  },
  // save selected
  saveeditedindex({ commit }, value) {
    commit("updateeditedindex", value);
  },
  // save selected
  saveloading({ commit }, value) {
    commit("updateloading", value);
  },
  // delete loader
  deletebulkitem({ commit }) {
    let data = state.all;
    data.splice(state.editedIndex, 1);
    let item = {
      title: "",
      subject: "",
      addresses: "",
      content: "",
      status: "",
      attachment: "",
      createdAt: ""
    };
    // updated selected
    commit("updateselected", item);
    // update the table
    commit("updateall", data);
    // timeout loader and edited index
    setTimeout(() => {
      // reset edited index
      commit("updateeditedindex", -1);
      // close loader
      commit("updateloading", false);
    }, 1000);
  }
};
const mutations = {
  // update all content
  updateall(state, value) {
    state.all = value;
  },
  // update selected
  updateselected(state, value) {
    state.selected = value;
  },
  // reset edited
  updateeditedindex(state, value) {
    state.editedIndex = value;
  },
  // save loader
  updateloading(state, value) {
    state.loading = value;
  }
};
export const bulk = {
  namespaced: true,
  state,
  actions,
  mutations
};
