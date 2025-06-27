from src.database.static_files_source import static_files_source
from src.models.product import ProductIn, TypeEnum

beers: list[ProductIn] = [
    ProductIn(
        name="Cerveja Leopoldina Barley Wine Turfada",
        description=(
            "A Leopoldina Barley Wine Turfada reflete toda imperialidade e nobreza que a marca "
            "carrega em sua história. Inspirada na expertise enológica do grupo Famiglia Valduga, "
            "este ícone da cerveja brasileira maturou por 24 meses nos tanques de inox da Brewine "
            "Leopoldina e mais 24 meses em barricas de carvalho americano, usadas anteriormente "
            "para envelhecimento de Whisky Turfado."
        ),
        price=649,
        brand="Leopoldina",
        type=TypeEnum.beer,
        alcohol_content=14,
        ibu=10,
        disponible=True,
        source=f"{static_files_source}/leopoldina_barley.png",
        quantity=5,
        volume=700,
    ),
    ProductIn(
        name="Cerveja Corona Extra",
        description=(
            "Corona Extra é a cerveja mais vendida e a marca mais exportada do México. Esta cerveja "
            "do tipo Pilsen foi produzida pela primeira vez em 1925 pela Cervecería Modelo, localizada "
            "na Cidade do México. Possui sabor leve de baixa graduação alcoólica. Uma fatia de limão "
            "no gargalo reforça a acidez com suas doses cítricas, fazendo com que a experiência de tomar "
            "a Corona se torne especial. Corona não é só uma cerveja, é um estilo de vida. Um convite para "
            "se desconectar da rotina e aproveitar mais a vida lá fora, na praia e curtindo um pôr do sol com os amigos."
        ),
        price=9.45,
        brand="Grupo Modelo",
        type=TypeEnum.beer,
        alcohol_content=4.6,
        ibu=18,
        disponible=True,
        source=f"{static_files_source}/corona_extra.png",
        quantity=600,
        volume=330,
    ),
    ProductIn(
        name="Patagonia Bohemian Pilsener",
        description=(
            "A Patagonia Bohemian Pilsener é uma tradicional cerveja do tipo Pilsen. Ela é produzida "
            "com o lúpulo tcheco Saaz que proporciona um aroma fresco e frutado bem característico, além "
            "de uma coloração dourada profunda. Escolha pratos com frutos do mar e peixes, como anchovas ou "
            "bacalhau, para combinar com o sabor dessa cerveja argentina."
        ),
        price=12.50,
        brand="Patagonia",
        type=TypeEnum.beer,
        alcohol_content=5.2,
        ibu=18,
        disponible=True,
        source=f"{static_files_source}/patagonia_pilsener.jpg",
        quantity=400,
        volume=355,
    )
]
