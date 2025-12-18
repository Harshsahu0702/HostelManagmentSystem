const HostelSetup = require('../models/HostelSetup');

exports.getRoomStats = async (req, res) => {
  try {
    const setup = await HostelSetup.findOne({ status: "COMPLETED" }).select('generatedRooms');
    
    if (!setup || !setup.generatedRooms) {
      return res.json({
        totalRooms: 0,
        occupiedRooms: 0
      });
    }

    const totalRooms = setup.generatedRooms.length;
    const occupiedRooms = setup.generatedRooms.filter(room => room.occupied).length;

    res.json({
      totalRooms,
      occupiedRooms
    });
  } catch (error) {
    console.error('Error fetching room stats:', error);
    res.status(500).json({ error: 'Failed to fetch room statistics' });
  }
};
