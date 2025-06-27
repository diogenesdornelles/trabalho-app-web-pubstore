from src.database.static_files_source import static_files_source
from src.models.product import ProductIn, TypeEnum

wines: list[ProductIn] = [
    ProductIn(
        name="Garrafão de Vinho Sangue de Boi Tinto",
        description="""O garrafao de vinho sangue de boi tinto suave 4000ml é o garrafao ideal para curtir bons momentos.""",
        alcohol_content=10,
        brand="Aurora",
        ibu=0,
        price=71.90,
        type=TypeEnum.wine,
        disponible=True,
        source=f"{static_files_source}/vinho_suave_sangue_boi.png",
        quantity=100,
        volume=4000,
    ),
    ProductIn(
        name="Marques De Casa Concha Cabernet Sauvignon",
        description="""O Vinho Chileno MARQUES DE CASA CONCHA é um dos ícones da vinícola Concha y Toro. Tem como origem o Vale do Alto Maipo, no Chile, e é produzido com uvas Cabernet Sauvignon de vinhedos da região aos pés da Cordilheira dos Andes. De vermelho profundo, tem aroma de cereja, cedro, amora e um toque de alcatrão e fumaça, com notas amadeiradas""",
        alcohol_content=14.5,
        brand="Concha y Toro",
        ibu=0,
        price=118.89,
        type=TypeEnum.wine,
        disponible=True,
        source=f"{static_files_source}/concha_y_toro.png",
        quantity=350,
        volume=750,
    ),
]
