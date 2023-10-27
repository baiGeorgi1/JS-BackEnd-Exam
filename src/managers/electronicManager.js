const Electronic = require('../model/Electronic');

exports.create = (Data) => Electronic.create(Data);

exports.getAll = async (name, type) => {
    let result = await Electronic.find().populate('owner').lean();
    if (name) {
        result = result.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    } else if (type) {
        result = result.filter(item => item.type.toLowerCase().includes(type.toLowerCase()));
    }

    return result;
};
exports.getById = async (itemId) => await Electronic.findById(itemId).lean();

exports.deleteItem = async (id) => {
    await Electronic.findByIdAndDelete(id).lean();
};
exports.edit = async (id, data) => {
    const result = await Electronic.findByIdAndUpdate(id, data);
    return result.save();

};
exports.buy = async (id, userId) => {
    const bought = await Electronic.findById(id);

    if (bought.buyingList.includes(userId)) {
        throw new Error('Product is alredy bought!');
    }

    bought.buyingList.push(userId);
    return bought.save();
};
