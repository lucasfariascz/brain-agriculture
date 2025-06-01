import { RuralProducerEntity } from '../../features/rural-producer/entities/rural-producer.entity';
import AppDataSource from './data-source';
import { PropertyEntity } from '../../features/property/entities/property.entity';
import { HarvestEntity } from '../../features/harvest/entities/harvest.entity';
import { PlantCropEntity } from '../../features/plat-crop/entities/plant-crop.entity';
import { isNotNullOrUndefined } from '../config/utils/string-transformations';

async function seed() {
  await AppDataSource.initialize();

  // Rural Producer
  const producerRepository = AppDataSource.getRepository(RuralProducerEntity);

  const findProducer = await producerRepository.findOne({
    where: {
      cpfOrCnpj: '97.063.802/0001-82',
    },
  });

  if (!isNotNullOrUndefined(findProducer)) {
    const producerEntity = producerRepository.create({
      id: '59af6bba-dc6a-4fcc-9673-45b40b7be51c',
      name: 'L F Souza LTDA',
      cpfOrCnpj: '97.063.802/0001-82',
    });

    await producerRepository.save(producerEntity);

    // End Rural Producer

    // Property
    const propertyRepositoy = AppDataSource.getRepository(PropertyEntity);

    const propertyEntity = propertyRepositoy.create({
      id: 'c1e55996-1d6f-492a-83a6-b65434d9712a',
      farmName: 'Fazenda do Souza 1',
      farmCity: 'São Paulo',
      farmState: 'SP',
      totalAreaHectares: 100,
      arableAreaHectares: 100,
      vegetationAreaHectares: 100,
      ruralProducer: producerEntity,
    });

    await propertyRepositoy.save(propertyEntity);

    const propertyEntity2 = propertyRepositoy.create({
      id: 'cdaf799f-7f24-4669-9f49-e61ed7011ec3',
      farmName: 'Fazenda do Souza 2',
      farmCity: 'São Paulo',
      farmState: 'SP',
      totalAreaHectares: 100,
      arableAreaHectares: 100,
      vegetationAreaHectares: 100,
      ruralProducer: producerEntity,
    });

    await propertyRepositoy.save(propertyEntity2);
    // End Property

    // Harvest
    const harvestRepository = AppDataSource.getRepository(HarvestEntity);

    const harvestEntity = harvestRepository.create({
      id: 'be89a300-80d3-40c0-8a59-8fb6501a9838',
      year: 2025,
    });

    await harvestRepository.save(harvestEntity);
    // End Harvest

    // Plant Crop
    const plantCropRepository = AppDataSource.getRepository(PlantCropEntity);

    const plantCropEntity = plantCropRepository.create({
      id: 'e1437cce-f708-49cd-8b53-1ba301c774d2',
      name: 'Soja',
      property: propertyEntity,
      harvest: harvestEntity,
    });

    await plantCropRepository.save(plantCropEntity);
    // End Plant Crop
  }
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
});
