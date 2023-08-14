class apartments {   
    async getApartmentsDetail(apartments_id) {
      return await SQLManager.findOne("apartments", { apartments_id: apartments_id });
    }
  
    async getApartmentsList(whereClause) {
      return await SQLManager.find("apartments", whereClause);
    }
  
    async updateApartments(whereClause, updateData) {
      return await SQLManager.update("apartments", whereClause, updateData);
    }
  
    async createApartments(apartmentsObj) {
      return await SQLManager.insert("apartments", apartmentsObj);
    }
  
    async getCustomApartmentsData(gender) {
      return await SQLManager.doExecuteRawQuery(`SELECT * FROM apartments WHERE gender = :gender`, { gender: gender });
    }
  }
  
  module.exports = apartments;